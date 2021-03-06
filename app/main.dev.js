/* eslint global-require: 0, flowtype-errors/show-errors: 0 */
import { app, Menu, Tray } from 'electron';
import path from 'path';

import createCertSelectorWindow from './CertSelector/CertSelectorWindow';
import startServer from './server';


/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build-main`, this file is compiled to
 * `./app/main.prod.js` using webpack. This gives us some performance wins.
 *
 * @flow
 */
if (process.platform === 'darwin') {
  app.dock.hide();
}


if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
  require('electron-debug')();
  const p = path.join(__dirname, '..', 'app', 'node_modules');
  require('module').globalPaths.push(p);
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [
    'REACT_DEVELOPER_TOOLS',
    'REDUX_DEVTOOLS'
  ];

  return Promise
    .all(extensions.map(name => installer.default(installer[name], forceDownload)))
    .catch(console.log);
};


/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  if (process.platform === 'darwin') {
    app.dock.hide();
  }
});

app.on('browser-window-created', () => {
  if (process.platform === 'darwin') {
    app.dock.show();
  }
});


app.on('ready', async () => {
  if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
    await installExtensions();
  }
  const tray = new Tray(path.join(__dirname, 'includes', 'iconTemplate.png'));
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Quit WebSign', click() { app.quit(); } },
  ]);
  tray.setToolTip('WebSign');
  tray.setContextMenu(contextMenu);
  startServer((origin, data, socket) => { createCertSelectorWindow(origin, data, socket); });
});
