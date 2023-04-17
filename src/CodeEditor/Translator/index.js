import React, { useEffect, useRef, useState } from "react";
import getInputSelection, { setCaretPosition } from "./utils";
import getCaretCoordinates from "textarea-caret";
import classes from "./styles.module.css";


//syntaxing the code

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_RETURN = 13;
const KEY_ENTER = 14;
const KEY_ESCAPE = 27;
const KEY_TAB = 9;

const OPTION_LIST_Y_OFFSET = 10;
const OPTION_LIST_MIN_WIDTH = 100;

//for css
const className = 'npm__react-simple-code-editor__textarea';

const cssText = /* CSS */ `
/**
 * Reset the text fill color so that placeholder is visible
 */
.${className}:empty {
  -webkit-text-fill-color: inherit !important;
}
/**
 * Hack to apply on some CSS on IE10 and IE11
 */
@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {
  /**
    * IE doesn't support '-webkit-text-fill-color'
    * So we use 'color: transparent' to make the text transparent on IE
    * Unlike other browsers, it doesn't affect caret color in IE
    */
  .${className} {
    color: transparent !important;
  }
  .${className}::selection {
    background-color: #accef7 !important;
    color: transparent !important;
  }
}
`;
const styles = {
    container: {
      position: 'relative',
      textAlign: 'left',
      boxSizing: 'border-box',
      padding: 0,   
    },
    textarea: {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: '100%',
      overflow: 'hidden',
      resize: 'none',
      color: 'inherit',
      MozOsxFontSmoothing: 'grayscale',
      WebkitFontSmoothing: 'antialiased',
      WebkitTextFillColor: 'transparent',
    },
    highlight: {
      position: 'relative',
      pointerEvents: 'none',
    },
    editor: {
      margin: 0,
      border: 0,
      background: 'none',
      boxSizing: 'inherit',
      display: 'inherit',
      fontFamily: 'inherit',
      fontSize: 'inherit',
      fontStyle: 'inherit',
      fontVariantLigatures: 'inherit',
      fontWeight: 'inherit',
      letterSpacing: 'inherit',
      lineHeight: 'inherit',
      tabSize: 'inherit',
      textIndent: 'inherit',
      textRendering: 'inherit',
      textTransform: 'inherit',
      whiteSpace: 'pre-wrap',
      wordBreak: 'keep-all',
      overflowWrap: 'break-word',
    },
  };



export const ReactTransliterate = ({
  Component="textarea",
  translate = true,
  onBlur = () => {},
  disabled = false,
  preClassName,
  lang = "hi",
  offsetX = 0,
  offsetY = 10,
  onChange,
  value,
  language,
  highlight, 
  padding,
  style,
  textareaClassName,
  onKeyDown = () => {},
  containerClassName = "",
  containerStyles = {},
  activeItemStyles = {},
  maxOptions = 5,
  ...rest
}) => {
  const [options, setOptions] = useState([]);
  const [left, setLeft] = useState(0);
  const [top, setTop] = useState(0);
  const [selection, setSelection] = useState(0);
  const [matchStart, setMatchStart] = useState(-1);
  const [matchEnd, setMatchEnd] = useState(-1);
  const inputRef = useRef(null);
  const[ text,setText]=useState("");

  


  const getSuggestions = async (lastWord) => {
    // fetch suggestion from api
    // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${lastWord}`;
    // const url = `https://inputtools.google.com/request?text=${lastWord}&itc=${lang}-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
    // try {
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   if (data && data[0] === "SUCCESS") {
    //     let found = data[1][0][1];
    //     found = found.slice(0, maxOptions);
    //     setOptions(found);
    //   }
    // } catch (e) {
    //   // catch error
    //   console.error("There was an error with transliteration", e);
    // }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    // setText(value);
    // console.log(text);

  


    // console.log("anshu",value)

    // bubble up event to the parent component
    onChange(e);

    // get the current index of the cursor
    const caret = getInputSelection(e.target).end;
    const input = inputRef.current;
    
    const caretPos = getCaretCoordinates(input, caret);
    console.log("anshu",caretPos,caret)

    // console.log(caretPos);

    // search for the last occurence of the space character from
    // the cursor
    const indexOfLastSpace =
      value.lastIndexOf(" ", caret - 1) < value.lastIndexOf("\n", caret - 1)
        ? value.lastIndexOf("\n", caret - 1)
        : value.lastIndexOf(" ", caret - 1);

    // first character of the currently being typed word is
    // one character after the space character
    // index of last character is one before the current position
    // of the caret
    setMatchStart(indexOfLastSpace + 1);
    setMatchEnd(caret - 1);

    // currentWord is the word that is being typed
    const currentWord = value.slice(indexOfLastSpace + 1, caret);
    if (currentWord) {
      // make an api call to fetch suggestions
      getSuggestions(currentWord);

      const rect = input.getBoundingClientRect();

      // get the position of the top left corner of the suggestion box
      // and save it to state
      const top = caretPos.top + input.offsetTop;
      const left = Math.min(
        caretPos.left + input.offsetLeft-OPTION_LIST_Y_OFFSET ,
        input.offsetLeft + rect.width - OPTION_LIST_MIN_WIDTH,
      );
// console.log(caretPos.left ,input.offsetLeft,OPTION_LIST_Y_OFFSET)
      setTop(top);
      setLeft(left);
    } else {
      reset();
    }
  };

  const handleKeyDown = (event) => {
    const helperVisible = options.length > 0;

    if (helperVisible && translate) {
      switch (event.keyCode) {
        case KEY_ESCAPE:
          event.preventDefault();
          reset();
          break;
        case KEY_UP:
          event.preventDefault();
          setSelection((options.length + selection - 1) % options.length);
          break;
        case KEY_DOWN:
          event.preventDefault();
          setSelection((selection + 1) % options.length);
          break;
        case KEY_ENTER:
        case KEY_RETURN:
        case KEY_TAB:
          event.preventDefault();
          handleSelection(selection);
          break;
        default:
          onKeyDown(event);
          break;
      }
    } else {
      onKeyDown(event);
    }
  };

  const handleResize = () => {
    // TODO implement the resize function to resize
    // the helper on screen size change
  };

  const handleSelection = (index) => {
    const currentString = value;
    // create a new string with the currently typed word
    // replaced with the word in transliterated language
    const newValue =
      currentString.substring(0, matchStart) +
      options[index] +
      " " +
      currentString.substring(matchEnd + 1, currentString.length);

    // set the position of the caret (cursor) one character after the
    // the position of the new word
    setTimeout(() => {
      setCaretPosition(
        inputRef.current,
        matchStart + options[index].length + 1,
      );
    }, 1);

    // bubble up event to the parent component
    const e = { target: { value: newValue } };
    onChange(e);
    reset();
  };

  const reset = () => {
    // reset the component
    setSelection(0);
    setOptions([]);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const contentStyle = {
    paddingTop: padding,
    paddingRight: padding,
    paddingBottom: padding,
    paddingLeft: padding,
  };

  const highlighted = highlight(value);
  return (
    <div
      // position relative is required to show the component
      // in the correct position
      {...rest} style={{ ...styles.container, ...style }}
      
    >
    {/* <Editor
    ref={inputRef}
    value={value}
    onChange={(e) => console.log("getting the endvalue", e.target.value)}
    onValueChange={(code) => h}
    onKeyDown={handleKeyDown}
    highlight={(code) => highlight(code, languages.py)}
    {...rest}
    /> */}
      {/* <Editor 
        tabSize={4}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        {...rest}
      /> */}
      <textarea
        style={{
            ...styles.editor,
            ...styles.textarea,
            ...contentStyle,
          }}
        className={
            className + (textareaClassName ? ` ${textareaClassName}` : '')
          }
        disabled={disabled}
        onBlur={onBlur}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={inputRef}
        value={value}
        
        {...rest}
      />
      {/* <div>
        {text.split("\n").map((line, index) => (
    <div>{index + 1}.{line} </div>
  ))}
      </div> */}
      <pre
      className={preClassName}
      aria-hidden="true"
      style={{ ...styles.editor, ...styles.highlight, ...contentStyle }}
      {...(typeof highlighted === 'string'
        ? { dangerouslySetInnerHTML: { __html: highlighted  } }
        : { children: highlighted })}
    />
    {/* eslint-disable-next-line react/no-danger */}
    <style type="text/css" dangerouslySetInnerHTML={{ __html: cssText }} />
      
      {options.length > 0 && translate ? (
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
      ): null}
      
    </div>
  );
};