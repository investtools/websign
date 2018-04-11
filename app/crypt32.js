var Ctx, HCertStore, ffi, k, pCtx, ref, ref1, struct, v;

ffi = require('ffi');

ref = require('ref');

struct = require('ref-struct');

Ctx = struct({
  dwCertEncodingType: 'long',
  pbCertEncoded: 'pointer',
  cbCertEncoded: 'long',
  pCertInfo: 'pointer',
  hCertStore: HCertStore = ref.refType(ref.types["void"])
});

pCtx = ref.refType(Ctx);

const CryptIntegerBlob = struct({
  cbData: 'long',
  pbData: 'pointer'
})

const CryptAlgorithmIdentifier = struct({
  pszObjId: 'string',
  Parameters: CryptIntegerBlob
})

const SignPara = struct({
  /*DWORD                      */cbSize: 'long',
  /*DWORD                      */dwMsgEncodingType: 'long',
  /*PCCERT_CONTEXT             */pSigningCert: 'pointer',
  /*CRYPT_ALGORITHM_IDENTIFIER */HashAlgorithm: CryptAlgorithmIdentifier,
  /*void                       */pvHashAuxInfo: 'pointer',
  /*DWORD                      */cMsgCert: 'long',
  /*PCCERT_CONTEXT             */rgpMsgCert: 'pointer',
  /*DWORD                      */cMsgCrl: 'long',
  /*PCCRL_CONTEXT              */rgpMsgCrl: 'pointer',
  /*DWORD                      */cAuthAttr: 'long',
  /*PCRYPT_ATTRIBUTE           */rgAuthAttr: 'pointer',
  /*DWORD                      */cUnauthAttr: 'long',
  /*PCRYPT_ATTRIBUTE           */rgUnauthAttr: 'pointer',
  /*DWORD                      */dwFlags: 'long',
  /*DWORD                      */dwInnerContentType: 'long',
  /*CRYPT_ALGORITHM_IDENTIFIER */HashEncryptionAlgorithm: CryptAlgorithmIdentifier,
  /*void                       */pvHashEncryptionAuxInfo: 'pointer',
})

const pSignPara = ref.refType(SignPara)

const exports = ffi.Library('crypt32', {
  CertOpenSystemStoreA: [HCertStore, ['pointer', 'string']],
  CertCloseStore: ['int', [HCertStore, 'long']],
  CertEnumCertificatesInStore: [pCtx, [HCertStore, pCtx]],
  CryptSignMessage: ['bool', [pSignPara, 'bool', 'long', 'pointer', 'pointer', 'pointer', 'pointer']]
});

exports.SignPara = SignPara
exports.CryptAlgorithmIdentifier = CryptAlgorithmIdentifier
exports.CryptIntegerBlob = CryptIntegerBlob

module.exports = exports;
