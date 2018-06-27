export function listCertificates() {
  return [
    { id: '1', subject: 'INVESTTOOLS', issuer: 'ICP-Brasil' },
    { id: '2', subject: 'ANDRÉ AIZIM KELMANSON', issuer: 'ICP-Brasil' }
  ];
}

export function sign(data, certificate) {
  return `sign(${data}, ${certificate})`;
}
