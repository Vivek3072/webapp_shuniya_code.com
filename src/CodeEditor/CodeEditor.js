import React, { Fragment, useRef, useState, } from 'react';
import { ReactTransliterate } from "./Translator/index";

import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import {File, FileCheck} from 'react-bootstrap-icons';

import { languages } from './languages';



const styles = {
  root: {
    boxSizing: 'border-box',
    fontFamily: '"Dank Mono", "Fira Code", monospace',
    minHeight: '200px',
    ...theme.plain
  }
}



const CodeEditor = ({ texteditor, handleChange, handleKeyDown, handleCode, input, handleInput, customInput, setcustomInput }) => {

  const [lang, setLang] = useState("hi");

  const [disable, setDisable] = useState(true);

  const [show, setShow] = useState(false)

  const componentRef = useRef();

  const highlight = code => (
    <Highlight {...defaultProps} theme={theme} code={code} language="py">
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Fragment>
          {tokens.map((line, i) => (
            <div {...getLineProps({ line, key: i })}>
              {line.map((token, key) => <span {...getTokenProps({ token, key })} />)}
            </div>
          ))}
        </Fragment>
      )}
    </Highlight>
  )


  return (
    <div >
      <div className="d-flex justify-content-between">
      <div className="d-flex  justify-content-between">
        <label htmlFor="language" className="mr-4">Language</label>
        <select
          className="language-dropdown mb-4"
          value={lang}
          onChange={(e) => setLang(e.target.value)}
        >
          {languages.map((l) => (
            <option key={l.value} value={l.value}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
      <div className="d-flex ">
        <div className="mr-4"> Transliterate </div>
        <button className="btn-secondary" style={{ height: '25px'}} onClick={() => setDisable(!disable)}>{disable ? 'ON' : 'OFF'}</button>
      </div>
      </div>
  
      <ReactTransliterate
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
      />
      <div className='d-flex justify-content-between' style={{ maxWidth: '200px' }}>
        <div>Custom Input</div>
        <div onClick={setcustomInput}>{customInput ? <FileCheck color="green" size={20} /> : <File size={20} /> }</div>
      </div>
      {
        customInput ?
          <textarea  className='mt-1 multi-input' value={input} onChange={handleInput} /> : null
      }
    </div>
  )
}

export default CodeEditor