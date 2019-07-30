import {ipcRenderer} from 'electron';
import createStore from './store';
import watch from './watcher';

let store = createStore();
store.dispatch({type: 'INIT'});

store.subscribe(() => {
   ipcRenderer.send('background-update', store.getState().projects);
});

ipcRenderer.send('background-update', store.getState().projects);

ipcRenderer.on('watch-project', (_, project) => {
	console.log('watching: ', project)
	watch(project.path, () => {
		store.dispatch({
			type: 'PROJECT_ADDED',
			payload: {project}
		});
	});
});

ipcRenderer.on('update-project', (_, project) => {
   store.dispatch({
		type: 'PROJECT_ADDED',
		payload: {project}
	});
});