import {remote} from 'electron';
import {readFileSync, writeFileSync} from 'fs';
import {join} from 'path';
import parseProject from './parser.js';

const getUserData = () => {
   try {
      const userDataPath = remote.app.getPath('userData');
      const dataPath = join(userDataPath, 'data.json');
      const data = JSON.parse(readFileSync(dataPath));
      return data;
   } catch(err) {
      return {};
   };
}

const setUserData = (data) => {
   const userDataPath = remote.app.getPath('userData');
   const dataPath = join(userDataPath, 'data.json');
   writeFileSync(dataPath, JSON.stringify(data));
}

const reducer = (state, action) => {
   switch(action.type) {
      case('INIT'): {
         const projects = getUserData();
         const nextState = {projects};
         return nextState;
      }
      case('PROJECT_ADDED'): {
         console.log('reducer: ', action.payload)
         const project = parseProject(action.payload.project);
         console.log('parsed: ', project)
         const nextState = {
            ...state,
            projects: {
               ...state.projects,
               [project.path]: project,
            }
         };
         setUserData(nextState.projects);
         return nextState;
      }
      default: {
         return state;
      }
   }
}

const createStore = () => {
   let listeners = [];
   let state = {};

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