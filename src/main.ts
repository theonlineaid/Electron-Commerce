import { app, BrowserWindow, ipcMain } from 'electron';
import { createWindow, RouteKeys, windowRoutes } from './ipc';
let mainWindow: BrowserWindow;

if (require('electron-squirrel-startup')) app.quit()

ipcMain.on('open-new-window', (event, route: RouteKeys) => {
  const windowConfig = windowRoutes[route] as any;

  if (windowConfig) {
    createWindow(windowConfig.route, windowConfig.options);
  } else {
    console.error(`No configuration found for route: ${route}`);
  }
});

ipcMain.on('open-product-details', (event, productId: number) => {
  const route = `/product/${productId}`;
  createWindow(route, windowRoutes.product.options);
});


app.whenReady().then(() => {
  const mainConfig = windowRoutes.main;
  mainWindow = createWindow(mainConfig.route, mainConfig.options);
});

// Quit when all windows are closed, except on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Reopen the main window on macOS when the dock icon is clicked
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    const mainConfig = windowRoutes.main;
    mainWindow = createWindow(mainConfig.route, mainConfig.options);
  }
});
