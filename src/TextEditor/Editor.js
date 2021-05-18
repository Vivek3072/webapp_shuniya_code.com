import React, { useState, useRef } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

//for transliterate
import getInputSelection, {setCaretPosition} from './Translator/utils'
import getCaretCoordinates from 'textarea-caret'
import classes from './Translator/styles.module.css'


const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RETURN = 13;
const KEY_ENTER = 14;
const KEY_ESCAPE = 27;
const KEY_TAB = 9;
const KEY_SPACE = 32;

const OPTION_LIST_Y_OFFSET = 10;
const OPTION_LIST_MIN_WIDTH = 100;



export default function MyEditor(
    {maxOptions = 5, 
        offsetX = 0, 
        offsetY = 10,
  activeItemStyles = {},
        
    }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  //states for translation
  const [options, setOptions] = useState([]);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const [matchStart, setMatchStart] = useState(-1);
  const [matchEnd, setMatchEnd] = useState(-1);
  const [lang, setLang] = useState("hi")
//   const inputRef = useRef(null);
  

  const getSuggestions = async (lastWord) => {
      //fetch suggestions from api
      const url = `https://inputtools.google.com/request?text=${lastWord}&itc=${lang}-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
      try {
          const res = await fetch(url);
          const data = await res.json();
          if (data && data[0] === "SUCCESS") {
              let found = data[1][0][1]
              found = found.slice(0, maxOptions);
              setOptions(found)
          }
      } catch(e) {
          console.error('There was an error with the tranliteration', e);
      }
  };
  
  const editor = React.useRef(null);
  function handleChange(e) {
    const value = editor.current.editor.innerText
    console.log(e.clientX, e.clientY)
    console.log(e)
    setTop(e.clientY)
    setLeft(e.clientX)
    //caret in the index of the cursor
    //caret coordinates = { top: , left: , height:}
    const indexOfLastSpace = 
    value.lastIndexOf(" ", )

  }

  function handleSelection() {
      
  }


  return (
    <div
      style={{ border: "1px solid black", minHeight: "6em", cursor: "text" }}
      onClick={handleChange}
    >
      <Editor
        ref={editor}
        editorState={editorState}
        onChange={setEditorState}
        placeholder="Write something!"
      />
      { options.length > 0 && (
        <ul
          style={{
            left: `${left + offsetX}px`,
            top: `${top + offsetY}px`,
            position: "absolute",
            width: "auto",
          }}
          className={classes.ReactTransliterate}
        >
          {options.map((item, index) => (
            <li
              className={index === selection ? classes.Active : null}
              style={index === selection ? activeItemStyles || {} : {}}
              onMouseEnter={() => {
                setSelection(index);
              }}
              onClick={() => handleSelection(index)}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}