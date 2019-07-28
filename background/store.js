import {remote} from 'electron';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import parseProject from './parser.js';

const getUserData = () => {
   try {
      const userDataPath = remote.app.getPath('userData');
      const dataPath = join(userDataPath, "data.json");
      const data = JSON.parse(readFileSync(dataPath));
      return data;
   } catch(err) {
      return {};
   };
}

const setUserData = (data) => {
   const userDataPath = remote.app.getPath('userData');
   const dataPath = join(userDataPath, "data.json");
   writeFileSync(dataPath, JSON.stringify(data));
}

const reducer = (state, action) => {
   if (action.type === 'PROJECT_ADDED'){
      const project = parseProject(action.payload);
      const prevState = getUserData()
      const nextState = {
         ...prevState,
         [project.path]: project
      }
      setUserData(nextState)
      return nextState
   }
   return state
}

const createStore = () => {
   let listeners = [];
   let state = getUserData()

   const getState = () => {
      return state;
   };

   const subscribe = (listener) => {
      listeners.push(listener);
   };

   const dispatch = (action) => {
      state = reducer(state, action);
      listeners.forEach(listener => listener());
   };

   return {
      getState: getState,
      subscribe: subscribe,
      dispatch: dispatch
   };
};

export default createStore;