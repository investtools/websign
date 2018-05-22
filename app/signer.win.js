const crypt = require('./crypt32');
const forge = require('node-forge');
const ref = require('ref');

// const SZOID_RSA_SHA1RSA = "1.2.840.113549.1.1.5";
const SZOID_RSA_SHA256RSA = '1.2.840.113549.1.1.11';

const PKCS_7_ASN_ENCODING = 0x00010000;
const X509_ASN_ENCODING = 0x00000001;


function signMessage(cert, message) {
  const msg = Buffer.from(message);
  return CryptSignMessage(cert, msg, CryptSignMessage(cert, msg));
}

function CryptSignMessage(cert, msg, cbSignedBlob) {
  const msgSize = ref.alloc('uint', msg.length);
  const signature = cbSignedBlob && Buffer.alloc(cbSignedBlob);
  const signSize = ref.alloc('uint');

  const signPara = new crypt.SignPara({
    cbSize: crypt.SignPara.size,
    dwMsgEncodingType: PKCS_7_ASN_ENCODING | X509_ASN_ENCODING, // eslint-disable-line no-bitwise
    pSigningCert: cert,
    HashAlgorithm: {
      pszObjId: SZOID_RSA_SHA256RSA,
      Parameters: { cbData: null }
    },
    cMsgCert: 1,
    rgpMsgCert: cert.ref(),
    cAuthAttr: 0,
    dwInnerContentType: 0,
    cMsgCrl: 0,
    cUnauthAttr: 0,
    dwFlags: 0,
    pvHashAuxInfo: null,
    rgAuthAttr: null
  });
  const a = cbSignedBlob ? [signature, signSize.ref()] : [null, signSize];
  const success = crypt.CryptSignMessage(
    signPara.ref(),
    false,
    1,
    msg.ref(),
    msgSize,
    ...a
  );
  if (!success) {
    console.info('fail!');
    return;
  }
  return signature || signSize.readUInt32LE();
}


function certName(pCtx) {
  const ctx = pCtx.deref();
  const der = ctx.pbCertEncoded.reinterpret(ctx.cbCertEncoded);
  const { subject } = forge.pki.certificateFromAsn1(forge.asn1.fromDer(der.toString('binary')));
  const nameField = subject.getField('CN') || subject.getField('O');
  return nameField.value;
}

export function listCertificates() {
  let pCtx;
  const r = [];
  const store = crypt.CertOpenSystemStoreA(null, 'MY');
  try {
    pCtx = null;
    while (1) {
      pCtx = crypt.CertEnumCertificatesInStore(store, pCtx);
      if (pCtx.isNull()) {
        return r;
      }
      const name = certName(pCtx);
      r.push({ name, id: name });
    }
  } finally {
    crypt.CertCloseStore(store, 0);
  }
}

export function sign(data, certificate) {
  let pCtx;
  const store = crypt.CertOpenSystemStoreA(null, 'MY');
  try {
    pCtx = null;
    while (1) {
      pCtx = crypt.CertEnumCertificatesInStore(store, pCtx);
      if (pCtx.isNull()) {
        return;
      }
      if (certName(pCtx) === certificate) {
        const signed = signMessage(pCtx, data);
        if (!signed) {
          return data.toString('base64');
        }
        return signed.toString('base64');
      }
    }
  } finally {
    crypt.CertCloseStore(store, 0);
  }
}
