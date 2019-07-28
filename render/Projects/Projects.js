// TODO: add ability to remove projects
import React from 'react';
import {ipcRenderer} from 'electron';
import styles from './Projects.css';

const Projects = ({projects, setCurrentProject}) => {
   let ref = null;
   let dragging = false;

   const handleMouseMove = (e) => {
      // TODO: throttle resize event
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
      ipcRenderer.send('SHOW_FILE_PICKER');
   }
   const selectProject = (project, index) => {
      setCurrentProject(index);
      ipcRenderer.send('UPDATE_PROJECT', {
         name: project.name,
         path: project.path
      })
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
               onClick={() => selectProject(project, index)}
            >
               {project.name}
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