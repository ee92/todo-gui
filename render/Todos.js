import React from 'react';
import styles from './App.css';

const Todos = ({projects, currentProject}) => {
   const project = projects[currentProject];
   if (!project) return null;
   return (
      <div className={styles.todos}>
         {project.todos.map(todo =>
            <div key={todo.path + todo.text} className={styles.todo}>
               <div className={styles.todoText}>{todo.text}</div>
               <div className={styles.todoPath}>{todo.path}</div>
            </div>
         )}
      </div>
   )
}

export default Todos;