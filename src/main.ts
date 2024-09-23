import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';

// Dynamically infer route keys from windowRoutes
type RouteKeys = keyof typeof windowRoutes;

// Electron Squirrel Startup handling (for Windows)
if (require('electron-squirrel-startup')) {
  app.quit();
}

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

let mainWindow: BrowserWindow;

// Centralized configuration for routes and window options
const windowRoutes = {
  main: {
    route: '/',
    options: { width: 800, height: 600, minWidth: 380, minHeight: 300 },
  },
  new: {
    route: '/new',
    options: { width: 600, height: 400 },
  },
  settings: {
    route: '/settings',
    options: { width: 500, height: 300 },
  },
  // Add more routes/windows here
};

// Create a reusable window creation function
const createWindow = (route: string, options: Electron.BrowserWindowConstructorOptions) => {
  const newWindow = new BrowserWindow({
    ...options,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'), // Preload script for node access
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  // Load the proper route in development or production
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    newWindow.loadURL(`${MAIN_WINDOW_VITE_DEV_SERVER_URL}${route}`); // Load the route in dev
  } else {
    newWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
    newWindow.webContents.executeJavaScript(`
      window.history.pushState({}, '', '${route}');
    `); // Navigate to the specified route in production
  }

  // Open DevTools if in development
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    newWindow.webContents.openDevTools();
  }

  return newWindow;
};


// Listen for the event to open a new window dynamically
ipcMain.on('open-new-window', (event, route: RouteKeys) => {
  const windowConfig = windowRoutes[route];

  if (windowConfig) {
    createWindow(windowConfig.route, windowConfig.options);
  } else {
    console.error(`No configuration found for route: ${route}`);
  }
});

// App ready event to create the main window
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
