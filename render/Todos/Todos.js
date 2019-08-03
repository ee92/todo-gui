import React from 'react';
import styles from './Todos.css';

const Todo = ({todo, project, setCurrentTodo}) => {
   return (
      <div className={styles.todo} onClick={() => setCurrentTodo(todo)}>
         <div className={styles.todoText}>{todo.text}</div>
         <div className={styles.todoPath}>
            <span className={styles.link}>
               {todo.path.split(project.name).pop()}
            </span>
         </div>
      </div>
   )
}

const Todos = ({projects, currentProject, setCurrentTodo}) => {
   const project = projects[currentProject];
   return (
      <div className={styles.todos}>
         {project && project.todos
            .map(todo => 
               <Todo
                  todo={todo} 
                  project={project} 
                  key={todo.path + todo.text}
                  setCurrentTodo={setCurrentTodo}
               />
         )}
      </div>
   )
}

export default Todos;