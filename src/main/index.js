const { app, BrowserWindow, ipcMain } = require('electron');
const createStore = require('./store.js');

let store;

let mainWindow;

const createWindow = () => {
	store = createStore();
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
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

ipcMain.on('PROJECT_ADDED', (project) => {
	store.dispatch({type: 'PROJECT_ADDED', payload: project})
})