import React, { useState, useRef } from "react";
// import "./editor.css";
import {
  File,
  FileCheck,
  // BrightnessHigh,
  // MoonFill,
} from "react-bootstrap-icons";
import "./CodeEditor.css";

const CodeEditor = ({
  texteditor,
  handleChange,
  // handleKeyDown,
  // handleCode,
  input,
  handleInput,
  customInput,
  setcustomInput,
}) => {
  const [lines, setLines] = useState(1);
  const [currentLine, setCurrentLine] = useState(1);
  const handleLineChange = (event) => {
    const lines = event.target.value.split("\n").length;
    setLines(lines);
    handleChange(event);
  };

  const lineNumbers = [];
  for (let i = 1; i <= lines; i++) {
    const style = i === currentLine ? { fontWeight: "bold" } : {};
    lineNumbers.push(
      <div key={i} style={style}>
        {i}
      </div>
    );
  }
  const firstDivRef = useRef();
  const secondDivRef = useRef();

  const handleScrollFirst = (scroll) => {
    secondDivRef.current.scrollTop = scroll.target.scrollTop;
  };

  const handleScrollSecond = (scroll) => {
    firstDivRef.current.scrollTop = scroll.target.scrollTop;
  };
  //input tab key wala
  const inputRef = useRef(null);

  function handleKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      const { current } = inputRef;
      const { selectionStart, selectionEnd } = current;
      const value = current.value;
      current.value =
        value.substring(0, selectionStart) +
        "     " +
        value.substring(selectionEnd);
      current.selectionStart = current.selectionEnd = selectionStart + 4;
    }
  }

  const textArea = document.querySelector("#code");
  if (textArea) {
    const linenumber = textArea.value
      .substr(0, textArea.selectionStart)
      .split("\n").length;
    console.log(linenumber);
    if (linenumber !== currentLine) setCurrentLine(linenumber);
  }

  return (
    <div className="code-editor-container row ">
      <div className="editor_main mx-2">
        <div
          className="line-numbers mt-1"
          onScroll={handleScrollFirst}
          ref={firstDivRef}
        >
          {lineNumbers}
        </div>
        <textarea
          id="code"
          onScroll={handleScrollSecond} //ref={secondDivRef}
          ref={inputRef}
          type="text"
          onKeyDown={handleKeyDown}
          rows={lines}
          value={texteditor}
          onChange={handleLineChange}
          className="editor_class mt-1 multi-input p-1 col-10"
        ></textarea>
      </div>

      {/* <ReactTransliterate
        language="python"
        Component="textarea"
        highlight={highlight}
        translate={disable}
        value={texteditor}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        padding={14}
        style={styles.root}
        lang={lang}
        className="rounded mb-3"
      /> */}

      <div className="d-flex justify-content-start">
        <div>यूजर इनपुट </div>
        <div onClick={setcustomInput}>
          {customInput ? (
            <FileCheck color="green" size={20} />
          ) : (
            <File size={20} />
          )}
        </div>
      </div>
      {customInput ? (
        <textarea
          className="custom_input mt-1 multi-input p-1"
          value={input}
          onChange={handleInput}
        />
      ) : null}
    </div>
  );
};

export default CodeEditor;
