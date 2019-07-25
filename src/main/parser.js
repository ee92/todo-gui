const fs = require('fs');
const {join} = require('path');

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

const cleanTodos = (todos) => {
   todos.forEach(todo => {
      todo.text.trim().replace(/\n|\r/g, " ").replace(/\s{2,}/g, " ")
   })
}

const parseFile = (path, todos) => {
   const text = fs.readFileSync(path, 'utf-8');
   regex.forEach(expression => {
      const comments = text.match(expression.comment) || []
      comments.map(comment => {
         const matches = comment.match(expression.todo) || []
         matches.forEach(text => todos.push({path, text}))
      })
   })
}

const collectTodos = (path, todos) => {
   if (fs.statSync(path).isFile()) {
      parseFile(path, todos)
   }
   if (fs.statSync(path).isDirectory()) {
      const files = fs.readdirSync(path)
      files.forEach(file => {
         if (ignore.includes(file)) return
         const filePath = join(path, file)
         collectTodos(filePath, todos)
      })
   }
}

const parseProject = (file) => {
   let todos = []
   collectTodos(file.path, todos)
   cleanTodos(todos)
   return {
      name: file.name,
      path: file.path,
      todos
   }
}

module.exports = parseProject
