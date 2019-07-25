const {app} = require('electron');
const fs = require('fs');
const {join} = require('path');

const parseProject = require('./parser.js');

const getUserData = () => {
   try {
      const userDataPath = app.getPath('userData');
      const dataPath = join(userDataPath, "data.json");
      const data = JSON.parse(fs.readFileSync(dataPath));
      return data;
   } catch(err) {
      return {};
   };
}

const setUserData = (data) => {
   const userDataPath = app.getPath('userData');
   const dataPath = join(userDataPath, "data.json");
   fs.writeFileSync(dataPath, data)
}

const reducer = (state, action) => {
   if (action.type === 'ADD_PROJECT'){
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

module.exports = createStore;