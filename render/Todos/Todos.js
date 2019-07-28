// TODO: add styles to open button
import React from 'react';
import {shell} from 'electron';
import styles from './Todos.css';

const Todos = ({projects, currentProject}) => {
   const project = projects[currentProject];
   const openFile = (path) => {
      shell.openItem(path)
   }
   return (
      <div className={styles.todos}>
         {project && project.todos.map(todo =>
            <div key={todo.path + todo.text} className={styles.todo}>
               <div className={styles.todoText}>{todo.text}</div>
               <div className={styles.todoPath}>{todo.path}</div>
               <button onClick={() => openFile(todo.path)}>
                  open
               </button>
            </div>
         )}
      </div>
   )
}

export default Todos;