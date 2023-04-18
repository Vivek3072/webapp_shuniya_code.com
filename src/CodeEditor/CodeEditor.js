import React from "react";
// import { ReactTransliterate } from "./Translator/index";
// import Highlight, { defaultProps } from "prism-react-renderer";
// import Dark from "prism-react-renderer/themes/nightOwl";
// import Light from "prism-react-renderer/themes/duotoneLight";

import {
  File,
  FileCheck,
  // BrightnessHigh,
  // MoonFill,
} from "react-bootstrap-icons";
import "./CodeEditor.css";
// import { languages } from './languages';

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
  // const [lang, setLang] = useState("hi");
  // const [dark, setDark] = useState(true);
  // const [disable, setDisable] = useState(true);

  // const theme = dark ? Dark : Light

  // const styles = {
  //   root: {
  //     boxSizing: 'border-box',
  //     fontFamily: '"Dank Mono", "Fira Code", monospace',
  //     minHeight: '200px',
  //     backgroundColor:'#000000',
  //     ...theme.plain
  //   }
  // }

  // const [show, setShow] = useState(false)

  // const componentRef = useRef();

  // const highlight = code => (
  //   <Highlight {...defaultProps} theme={dark? Dark : Light} code={code} language="py">
  //     {({ className, style, tokens, getLineProps, getTokenProps }) => (
  //       <Fragment>
  //         {tokens.map((line, i) => (
  //           <div {...getLineProps({ line, key: i })}>
  //             {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
  //           </div>
  //         ))}
  //       </Fragment>
  //     )}
  //   </Highlight>
  // )

  return (
    <div className="mt-5">
      <div className="">
        <div className="mb-4 fs-3 fw-semibold"> Write your code below... </div>
        {/* <div className="d-flex justify-content-between mt-5">
        <div className="d-flex ">
          <button
            className="btn-dark rounded mb-4"
            style={{ height: "25px" }}
            onClick={() => setDisable(!disable)}
          >
            {disable ? "Hindi" : "English"}
          </button>
        </div>
        <div>
          <button className="btn-dark rounded" onClick={() => setDark(!dark)}>
            {dark ? <MoonFill /> : <BrightnessHigh />}
          </button>
        </div>
      </div> */}

        <textarea
          value={texteditor}
          onChange={handleChange}
          className="editor_class mt-1 multi-input p-1"
        ></textarea>

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

        <div
          className="d-flex justify-content-between"
        >
          <div>Custom Input</div>
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
    </div>
  );
};

export default CodeEditor;
