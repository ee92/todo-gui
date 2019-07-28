// TODO: watch file system for changes to projects in store
import { app, BrowserWindow, ipcMain, dialog } from 'electron';

let mainWindow;
let parserProcess;

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
};

const createParserProcess = () => {
	parserProcess = new BrowserWindow({
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	parserProcess.loadFile('build/background/index.html')
	ipcMain.on('background-update', (_, value) => {
		mainWindow.webContents.send('update', value);
	});
};

app.on('ready', () => {
	createWindow()
	createParserProcess()
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
	if (mainWindow === null) createWindow();
});

ipcMain.on('UPDATE_PROJECT', (_, project) => {
	parserProcess.webContents.send('update-project', project);
});

ipcMain.on('SHOW_FILE_PICKER', () => {
	dialog.showOpenDialog({properties: ['openDirectory']}, (files) => {
		if (!files) return;
		const path = files[0];
		const name = path.split('/').pop();
		parserProcess.webContents.send('update-project', {name, path});
	});
});
