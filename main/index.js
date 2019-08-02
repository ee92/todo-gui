import { app, BrowserWindow, ipcMain, dialog } from 'electron';

let mainWindow;
let parserProcess;

const createWindow = () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		backgroundColor: '#272822',
		webPreferences: {
			nodeIntegration: true
	   }
	});
	mainWindow.loadFile('build/render/index.html');
	// mainWindow.webContents.openDevTools();
	mainWindow.on('closed', () => {
		mainWindow = null;
		parserProcess.close()
	});
};

const createParserProcess = () => {
	parserProcess = new BrowserWindow({
		show: false,
		webPreferences: {
			nodeIntegration: true
		}
	});
	parserProcess.loadFile('build/background/index.html');
};

app.on('ready', () => {
	createWindow();
	createParserProcess();
});
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') app.quit();
});
app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
		createParserProcess();
	}
});

// forward to render
ipcMain.on('background-update', (_, projects) => {
	mainWindow.webContents.send('update', projects);
});

// forward to background
ipcMain.on('watch-project', (_, project) => {
	parserProcess.webContents.send('watch-project', project);
});
ipcMain.on('show-file-picker', () => {
	dialog.showOpenDialog({properties: ['openDirectory']}, (files) => {
		if (!files) return;
		const path = files[0];
		const name = path.split('/').pop();
		parserProcess.webContents.send('update-project', {name, path});
	});
});
