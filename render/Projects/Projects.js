import React from 'react';
import {ipcRenderer} from 'electron';
import styles from './Projects.css';

const Projects = ({projects, currentProject, setCurrentProject}) => {
   let ref = null;
   let dragging = false;

   const handleMouseMove = (e) => {
      if (dragging) {
         ref.style.width = e.clientX + "px";
      }
   }
   const handleMouseUp = () => {
      dragging = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
   }

   const handleMouseDown = (e) => {
      e.preventDefault()
      dragging = true
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
   }
   const showFilePicker = () => {
      ipcRenderer.send('show-file-picker');
   }
   const selectProject = (index) => {
      setCurrentProject(index);
   }
   return (
      <div className={styles.projects} ref={node => ref = node}>
         <div className={styles.sidebarHeader}>projects</div>
         <button className={styles.addProject} onClick={showFilePicker}>
            add project
         </button>
         {projects.map((project, index) => 
            <div
               key={project.path}
               className={styles.project}
               onClick={() => selectProject(index)}
            >
               <span>
                  {project.name}
                  <div className={index === currentProject
                     ? `${styles.projectName} ${styles.currentProject}`
                     :  styles.projectName
                  }/>
               </span>
            </div>
         )}
         <div
            className={styles.resizeBar}
            onMouseDown={handleMouseDown}
         />
      </div>
   )
};

export default Projects