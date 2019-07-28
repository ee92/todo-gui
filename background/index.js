import {ipcRenderer} from 'electron';
import createStore from './store.js';

let store = createStore();

ipcRenderer.send('background-update', store.getState());

store.subscribe(() => {
   console.log('sending: ', store.getState());
   ipcRenderer.send('background-update', store.getState());
});

ipcRenderer.once('update-project', (_, value) => {
   console.log('dispatch: ', value);
   store.dispatch({
		type: 'PROJECT_ADDED',
		payload: value
	});
});