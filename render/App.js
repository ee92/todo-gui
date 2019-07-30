import React, {useState, useEffect} from 'react';
import {ipcRenderer} from 'electron';
import Projects from './Projects';
import Todos from './Todos';
import styles from './App.css';

const App = () => {
   const [projects, setProjects] = useState([]);
   const [currentProject, setCurrentProject] = useState(0);

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
         />
      </div>
   );
};

export default App;