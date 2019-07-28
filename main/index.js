// TODO: watch file system for changes to projects in store
// TODO: move parsing to render process in hidden BrowserWindow
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import createStore from './store.js';

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

	mainWindow.loadFile('build/render/index.html');
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

ipcMain.on('UPDATE_PROJECT', (_, project) => {
	store.dispatch({
		type: 'PROJECT_ADDED',
		payload: project
	});
});

ipcMain.on('SHOW_FILE_PICKER', () => {
	dialog.showOpenDialog({properties: ['openDirectory']}, (files) => {
		if (!files) return
		const path = files[0]
		const name = path.split('/').pop()
		store.dispatch({
			type: 'PROJECT_ADDED',
			payload: {name, path}
		});
	});
});
