const fs = require('fs')
const { join } = require('path')

const ignore = ['node_modules', 'build', '.git', '.DS_Store']
const regex = [
   {  
      type: 'HTML',
      comment: /(<!--)(.|\n)+?(-->)/gm,
      todo: /(?<=(<!--)((.|\n)*?)TODO(:|\s))((?:(?!(-->))(.|\n)*?))*/gm
   }, {
      type: 'JS_LINE',
      comment: /\/\/\s+.*/g,
      todo: /(?<=(\/\/)\s+TODO(:|\s)).*/g
   }, {
      type: 'JS_BLOCK',
      comment: /(\/\*)(.|\n)+?(\*\/)/gm,
      todo: /(?<=(\/\*)((.|\n)*?)TODO(:|\s))((?:(?!(\*\/))(.|\n)*?))*/gm
   }
]

let todos = []

const renderTodos = () => {
   const list = document.getElementById('todo-list')
   todos.forEach(todo => {
      const node = document.createElement("li");
      const text = document.createTextNode(todo);
      node.appendChild(text); 
      list.appendChild(node);
   })
}

const cleanTodos = () => {
   todos = todos.map(todo => {
      let cleanTodo = todo.trim().replace(/\n|\r/g, "").replace(/\s{2,}/g, " ")
      return cleanTodo
   })
}

const findTodos = (path) => {
   const text = fs.readFileSync(path, 'utf-8');
   regex.forEach(exp => {
      const comments = text.match(exp.comment) || []
      comments.map(comment => {
         const matches = comment.match(exp.todo) || []
         todos = todos.concat(matches)
      })
   })
}

const traverse = (path) => {
   if (fs.statSync(path).isFile()) {
      findTodos(path)
   }
   if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path)
      files.forEach(file => {
         if (ignore.includes(file)) return
         const filePath = join(path, file)
         traverse(filePath)
      })
   }
}

document.getElementById('file-picker').addEventListener('change', event => {
   const path = event.target.files[0].path
   traverse(path)
   cleanTodos()
   renderTodos()
})

document.getElementById('add-project').addEventListener('click', () => {
   document.getElementById('file-picker').click()
})