export function listCertificates() {
  return [
    { id: '1', name: 'INVESTTOOLS' },
    { id: '2', name: 'ANDRÉ AIZIM KELMANSON' }
  ];
}

export function sign(data, certificate) {
  return `sign(${data}, ${certificate})`;
}
