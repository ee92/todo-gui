import React, {useState, useEffect} from 'react';
import {ipcRenderer} from 'electron';
import styles from './App.css';

const App = () => {
   const [projects, setProjects] = useState([]);
   const [currentProject, setCurrentProject] = useState(0);

   useEffect(() => {
      const project = projects[currentProject]
      if (project) {
         document.title = project.name
      }
   }, [projects, currentProject])

   const listenUpdate = (_, store) => {
      const projectList = Object.keys(store).map(key => store[key]);
      setProjects(projectList);
   };

   useEffect(() => {
      ipcRenderer.once('update', listenUpdate);
      return () => ipcRenderer.removeAllListeners('update');
   }, [listenUpdate]);

   ipcRenderer.once('update', listenUpdate);

   const showFilePicker = () => {
      ipcRenderer.send('SHOW_FILE_PICKER')
   };

   const selectProject = (project, index) => {
      setCurrentProject(index);
      ipcRenderer.send('UPDATE_PROJECT', {
         name: project.name,
         path: project.path
      });
   };

   const Projects = () => {
      return (
         <div className={styles.projects}>
            <div className={styles.sidebarHeader}>projects</div>
            <button className={styles.addProject} onClick={showFilePicker}>
               new
            </button>
            {projects.map((project, index) => 
               <div className={styles.project} onClick={() => selectProject(project, index)}>
                  {project.name}
               </div>
            )}
         </div>
      )
   }

   const Todos = () => {
      const project = projects[currentProject];
      if (!project) return null;
      return (
         <div className={styles.todos}>
            {project.todos.map(todo =>
               <div className={styles.todo}>{todo.text}</div>
            )}
         </div>
      )
   }

   return (
      <div className={styles.root}>
         <Projects/>
         <Todos/>
      </div>
   )
};

export default App;