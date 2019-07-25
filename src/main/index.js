const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const createStore = require('./store.js');

let store = createStore();

let mainWindow;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true
		}
	});

	mainWindow.loadFile('index.html');
	mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => mainWindow = null);
	mainWindow.webContents.once('dom-ready', () => {
		mainWindow.webContents.send('update', store.getState());
   });
	store.subscribe(() => {
		mainWindow.webContents.send('update', store.getState());
	});
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

ipcMain.on('SHOW_FILE_PICKER', () => {
	dialog.showOpenDialog({
		properties: ['openDirectory'],
	}, (files) => {
		if (!files) return
		const path = files[0]
		const name = path.split('/').pop()
		store.dispatch({
			type: 'PROJECT_ADDED',
			payload: {name, path}
		});
	});
});
