import React from 'react';
import {ipcRenderer} from 'electron';
import styles from './Projects.css';
import CreateNewFolder from '@material-ui/icons/CreateNewFolder'

const Projects = ({projects, currentProject, setCurrentProject}) => {
   const showFilePicker = () => {
      ipcRenderer.send('show-file-picker');
   }
   const selectProject = (index) => {
      setCurrentProject(index);
   }
   const nameStyle = (index) => {
      if (index === currentProject) {
         return `${styles.projectName} ${styles.underlined}`
      }
      return styles.projectName
   }
   return (
      <div className={styles.projects}>
         <div className={styles.sidebarHeader}>
            <span>projects</span>
            <span className={styles.addProject} onClick={showFilePicker}>
               <CreateNewFolder/>
            </span>
         </div>
         {projects.map((project, index) => 
            <div
               key={project.path}
               className={styles.project}
               onClick={() => selectProject(index)}
            >
               <span className={nameStyle(index)}>
                  {project.name}
               </span>
            </div>
         )}
      </div>
   )
};

export default Projects