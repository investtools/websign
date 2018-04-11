if (process.platform === 'win32') {
  module.exports = require('./signer.win.js'); // eslint-disable-line global-require
} else {
  module.exports = require('./signer.mock.js'); // eslint-disable-line global-require
}
