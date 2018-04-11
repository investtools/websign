import { BrowserWindow, ipcMain } from 'electron';

import { listCertificates, sign } from '../signer';
import MenuBuilder from '../menu';
import appURL from '../appURL';

ipcMain.on('websign/certificates/LOAD', event => {
  event.returnValue = listCertificates(); // eslint-disable-line no-param-reassign
});

function createLocalListener(win, listener) {
  return (event, ...args) => {
    if (event.sender.id === win.webContents.id) {
      return listener(event, ...args);
    }
  };
}

function ipcWindow(win, channel, listener) {
  const localListener = createLocalListener(win, listener);
  ipcMain.on(channel, localListener);
  win.on('closed', () => { ipcMain.removeListener(channel, localListener); });
}

export default function createCertSelectorWindow(origin, data, socket) {
  let win = new BrowserWindow({
    show: false,
    width: 500,
    height: 400,
    center: true,
  });

  win.loadURL(appURL);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  win.webContents.on('did-finish-load', () => {
    if (!win) {
      throw new Error('"win" is not defined');
    }
    win.show();
    win.setAlwaysOnTop(true);
    win.focus();
    win.setAlwaysOnTop(false);
  });

  ipcWindow(win, 'websign/certSelector/LOAD', event => {
    event.returnValue = { origin }; // eslint-disable-line no-param-reassign
  });

  ipcWindow(win, 'websign/certSelector/SIGN', (event, certificate) => {
    socket.emit('signed data', sign(data, certificate));
    win.close();
  });

  ipcWindow(win, 'websign/certSelector/CANCEL', () => { win.close(); });

  win.on('closed', () => {
    win = null;
  });

  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    const menuBuilder = new MenuBuilder(win);
    menuBuilder.buildMenu();
  }
}
