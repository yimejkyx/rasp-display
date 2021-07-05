const electron = require('electron');
// Module to control application life.
const app = electron.app;
// Module to create native browser window.
const {Tray, Menu, ipcMain, BrowserWindow } = electron;

if (require('electron-squirrel-startup')) return app.quit();

const path = require('path');
const url = require('url');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
const iconUrl = path.join(__dirname, './icon.ico');

let mainWindow = null;
let tray = null


function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, height: 480,
        frame: true,
        title: 'YimCryptoApp',
        icon: iconUrl,
        fullscreen: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            backgroundThrottling: false,
            webSecurity: false
        }
    });
    mainWindow.removeMenu();

    // and load the index.html of the app.
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('minimize', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });

    mainWindow.on('close', (event) => {
        event.preventDefault();
        mainWindow.hide();
    });
}

function exitApp() {
    tray.destroy();
    mainWindow.destroy();
    app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
    createWindow();

    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Exit',
            click: () => {
                exitApp();
            }
        },
    ])

    tray = new Tray(iconUrl);
    tray.setToolTip('This is my application.');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        mainWindow.show();
    });

    ipcMain.on('exit-app', () => {
        exitApp();
    });
});
