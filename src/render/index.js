const createState = require('./state.js');

const renderProjects = (projects) => {
   const list = document.getElementById('projects-list')
   Object.keys(projects).forEach(key => {
      const project = projects[key]
      console.log(project);
      const node = document.createElement("button");
      const text = document.createTextNode(project.name);
      node.appendChild(text); 
      list.appendChild(node);
   });
};

const renderTodos = (todos) => {
   const list = document.getElementById('todo-list');
   Object.keys(todos).forEach(key => {
      const todo = todos[key]
      const node = document.createElement("li");
      const text = document.createTextNode(todo.text);
      node.appendChild(text); 
      list.appendChild(node);
   });
};

const projectSelected = (event) => {
   const file = event.target.files[0];
   if (!file.path) return;
};

const init = () => {
   const initialState = {
      projects: {},
      todos: {}
   };
   let state = createState(initialState);

   state.ref('projects').listen((ref) => {
      renderProjects(ref.val());
   });
   
   state.ref('todos').listen((ref) => {
      renderTodos(ref.val());
   });

   document.getElementById('file-picker').addEventListener(
      'change',
      projectSelected
   );

   document.getElementById('add-project').addEventListener('click', () => {
      document.getElementById('file-picker').click();
   });
};

init()