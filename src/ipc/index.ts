import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';


export type RouteKeys = keyof typeof windowRoutes;


declare const MAIN_WINDOW_VITE_DEV_SERVER_URL: string;
declare const MAIN_WINDOW_VITE_NAME: string;

export const windowRoutes = {
    main: {
        route: '/',
        options: { width: 800, height: 600, minWidth: 380, minHeight: 300 },
    },
    new: {
        route: '/new',
        options: { width: 1200, height: 600, minWidth: 800, minHeight: 400 },
    },
    settings: {
        route: '/settings',
        options: { width: 500, height: 300 },
    },
    product: {
        options: { width: 800, height: 600 },
    },
    // cart: { route: '/cart', options: { width: 800, height: 600 } },
};

// Create a reusable window creation function
export const createWindow = (route: string, options: Electron.BrowserWindowConstructorOptions) => {
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