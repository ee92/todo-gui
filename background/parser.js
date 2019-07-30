import {readFileSync, readdirSync, statSync} from 'fs';
import {join} from 'path';

const ignore = ['node_modules', 'build', '.git', '.DS_Store']
const regex = [
   {  
      type: 'HTML',
      comment: /(<!--)(.|\n){0,200}?(-->)/gm,
      todo: /(?<=(<!--)((.|\n)*?)TODO(:|\s))((?:(?!(-->))(.|\n)*?))*/gm
   }, {
      type: 'JS_LINE',
      comment: /\/\/\s+.{0,200}/g,
      todo: /(?<=(\/\/)\s+TODO(:|\s)).*/g
   }, {
      type: 'JS_BLOCK',
      comment: /(\/\*)(.|\n){0,200}?(\*\/)/gm,
      todo: /(?<=(\/\*)((.|\n)*?)TODO(:|\s))((?:(?!(\*\/))(.|\n)*?))*/gm
   }
]

const cleanTodos = (todos) => {
   todos.forEach(todo => {
      todo.text.trim().replace(/\n|\r/g, " ").replace(/\s{2,}/g, " ")
   })
}

const parseFile = (path, todos) => {
   const text = readFileSync(path, 'utf-8');
   regex.forEach(expression => {
      const comments = text.match(expression.comment) || []
      comments.map(comment => {
         const matches = comment.match(expression.todo) || []
         matches.forEach(text => todos.push({path, text}))
      })
   })
}

const collectTodos = (path, todos) => {
   if (statSync(path).isFile()) {
      parseFile(path, todos)
   }
   if (statSync(path).isDirectory()) {
      const files = readdirSync(path)
      files.forEach(file => {
         if (ignore.includes(file)) return
         const filePath = join(path, file)
         collectTodos(filePath, todos)
      })
   }
}

const parseProject = (project) => {
   let todos = []
   collectTodos(project.path, todos)
   cleanTodos(todos)
   return {
      name: project.name,
      path: project.path,
      todos
   }
}

export default parseProject
