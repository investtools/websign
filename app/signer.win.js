import Signer from 'websign-signer';

export function listCertificates() {
  return Signer.list().map(c => ({ id: c.id, subject: c.subject, issuer: c.issuer }));
}

export function sign(data, id) {
  return Signer.find(id).sign(Buffer.from(data));
}
