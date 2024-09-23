import { app, BrowserWindow } from 'electron';
import path from 'path';

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 380,  // Set minimum width
    minHeight: 300, // Set minimum height (optional)
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,  // Enable node integration if needed
      contextIsolation: false // Disable context isolation if you want to access Node.js APIs directly
    },
  });

  // In development, load the Vite dev server URL. In production, load the production build.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL); // Loaded from Vite server
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)); // Loaded from production build
  }

  // Optionally open DevTools in development mode
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.webContents.openDevTools();
  }
};

// Create window when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit the application when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
