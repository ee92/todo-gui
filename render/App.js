// TODO: make project header with link to project and search bar
// TODO: add ability to remove projects from sidebar
import React, {useState, useEffect} from 'react';
import {ipcRenderer} from 'electron';
import Editor from './Editor';
import Projects from './Projects';
import Todos from './Todos';
import styles from './App.css';

const App = () => {
   const [projects, setProjects] = useState([]);
   const [currentProject, setCurrentProject] = useState(0);
   const [currentTodo, setCurrentTodo] = useState(null)

   const listenUpdate = (_, store) => {
      const projectList = Object.keys(store).map(key => store[key]);
      setProjects(projectList);
   };

   useEffect(() => {
      const project = projects[currentProject];
      if (project) {
         ipcRenderer.send('watch-project', project);
      }
   }, [projects, currentProject]);

   useEffect(() => {
      const project = projects[currentProject]
      if (project) {
         document.title = project.name;
      }
   }, [projects, currentProject]);

   useEffect(() => {
      ipcRenderer.once('update', listenUpdate);
      return () => ipcRenderer.removeAllListeners('update');
   }, [listenUpdate]);

   ipcRenderer.once('update', listenUpdate);
    
   return (
      <div className={styles.root}>
         <Projects
            projects={projects}
            currentProject={currentProject}
            setCurrentProject={setCurrentProject}
         />
         <Todos 
            projects={projects} 
            currentProject={currentProject}
            setCurrentTodo={setCurrentTodo}
         />
         {currentTodo &&
            <Editor 
               todo={currentTodo}
               setCurrentTodo={setCurrentTodo}
            />}
      </div>
   );
};

// TODO: yoohoo im down here
export default App;