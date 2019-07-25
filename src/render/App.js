import React, {useState} from 'react';
import {ipcRenderer} from 'electron';

const App = () => {
   const [projects, setProjects] = useState([]);
   const [currentProject, setCurrentProject] = useState(0);

   ipcRenderer.on('update', (_, store) => {
      const projectList = Object.keys(store).map(key => store[key]);
      setProjects(projectList);
   });

   const showFilePicker = () => {
      ipcRenderer.send('SHOW_FILE_PICKER')
   };

   const Projects = () => {
      return (
         <div>
            {projects.map((project, index) => 
               <button onClick={() => setCurrentProject(index)}>
                  {project.name}
               </button>
            )}
         </div>
      )
   }

   const Todos = () => {
      const project = projects[currentProject];
      if (!project) return null;
      return (
         <ul>
            {project.todos.map(todo =>
               <li>{todo.text}</li>
            )}
         </ul>
      )
   }

   return (
      <div>
         <Projects/>
         <button onClick={showFilePicker}>Add Project</button>
         <Todos/>
      </div>
   )
};

export default App;