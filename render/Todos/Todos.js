import React from 'react';
import {shell} from 'electron';
import styles from './Todos.css';

const Todo = ({todo, project}) => {
   const openFile = (path) => {
      shell.openItem(path)
   }
   return (
      <div className={styles.todo}>
         <div className={styles.todoText}>{todo.text}</div>
         <div className={styles.todoPath} onClick={() => openFile(todo.path)}>
            <a href="#" className={styles.link}>
               {todo.path.split(project.name).pop()}
            </a>
         </div>
      </div>
   )
}

const Todos = ({projects, currentProject}) => {
   const project = projects[currentProject];
   return (
      <div className={styles.todos}>
         {project && project.todos
            .map(todo => <Todo todo={todo} project={project} key={todo.path + todo.text}/>
         )}
      </div>
   )
}

export default Todos;