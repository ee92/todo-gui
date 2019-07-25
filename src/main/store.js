const {app} = require('electron');
const path = require('path');
const fs = require('fs');

const parseProject = require('./parser.js');

const reducer = (state, action) => {
   if (action.type === 'ADD_PROJECT'){
      const project = parseProject(action.payload);
      return {
         ...state,
         [project.path]: project
      }
   }
   return state
}

const createStore = () => {
   let state = initialState();
   let listeners = [];
   
   const initialState = () => {
      try {
         const userDataPath = app.getPath('userData');
         const dataPath = path(userDataPath, "data.json");
         const data = JSON.parse(fs.readFileSync(dataPath));
         return data;
         
      } catch(err) {
         console.log(err);
         return {};
      };
   };

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

module.exports = createStore;