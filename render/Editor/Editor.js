import React, { useState, useEffect } from 'react';
import brace from 'brace';
import AceEditor from 'react-ace';
import fs from 'fs';
import throttle from 'lodash.throttle';
import Close from '@material-ui/icons/Close';
import Save from '@material-ui/icons/SaveAlt';
import styles from './Editor.module.css';

import 'brace/mode/javascript';
import 'brace/theme/monokai';

const Editor = ({todo, setCurrentTodo}) => {
   const [todoPreview, setTodoPreview] = useState('');
   const [width, setWidth] = useState(null);
   let resizing = false;
   let editorRef = undefined;

   useEffect(() => {
      document.addEventListener('keydown', handleKeys)
      return () => {
         document.removeEventListener('keydown', handleKeys)
      }
   }, [todoPreview])

   useEffect(() => {
      if (!todo) return;
      const text = fs.readFileSync(todo.path, "utf8");
      setTodoPreview(text);
      editorRef.editor.gotoLine(todo.line)
   }, [todo]);

   useEffect(() => {
      editorRef.editor.resize();
   }, [width])

   const handleMouseMove = (e) => {
      if (resizing === true) {
         const newWidth = window.innerWidth - e.pageX;
         setWidth(newWidth);
         if (newWidth < 150) {
            setCurrentTodo(null);
         }
      }
   };

   const handleMouseUp = () => {
      resizing = false;
      document.removeEventListener('mousemove', throttle(handleMouseMove, 75));
      document.removeEventListener('mouseup', handleMouseUp);
   };

   const handleMouseDown = (e) => {
      e.preventDefault();
      resizing = true;
      document.addEventListener('mousemove', throttle(handleMouseMove, 75));
      document.addEventListener('mouseup', handleMouseUp);
   };

   const handleKeys = (e) => {
      if (e.metaKey && e.key === 's') {
         e.preventDefault()
         saveChanges()
      }
   }

   const saveChanges = () => {
      fs.writeFileSync(todo.path, todoPreview);
   };

   return (
      <div className={styles.root}>
         <div className={styles.controls}>
            <button
               className={styles.close} 
               onClick={saveChanges}
            >
               <Save/>
            </button>
            <button
               className={styles.close} 
               onClick={() => setCurrentTodo(null)}
            >
               <Close/>
            </button>
         </div>
         <div className={styles.editor} style={{width: width || 500}}>
            <div onMouseDown={handleMouseDown} className={styles.resize}/>
            <AceEditor
               mode="javascript"
               theme="monokai"
               name="CodeEditor"
               height="auto"
               width="100%"
               showPrintMargin={false}
               wrapEnabled={true}
               editorProps={{$blockScrolling: 'Infinity'}}
               value={todoPreview}
               onChange={value=> setTodoPreview(value)}
               ref={node => editorRef = node}
            />
         </div>
      </div>
   )
}

export default Editor;