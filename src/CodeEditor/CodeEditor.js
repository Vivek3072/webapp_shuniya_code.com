import React, {Fragment, useState, } from 'react';
import { ReactTransliterate } from "./Translator/index";

import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'

import {languages} from './languages';




const styles = {
    root: {
      boxSizing: 'border-box',
      fontFamily: '"Dank Mono", "Fira Code", monospace',
      minHeight: '200px', 
      ...theme.plain
    }
  }


const CodeEditor = ({texteditor, handleChange, handleKeyDown, handleCode}) => {

  const [lang, setLang] = useState("hi");

  const [disable, setDisable] = useState(true);

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
        <div>
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
      <div> Transliterate </div>
      <button onClick={() => setDisable(!disable)}>{disable? 'ON': 'OFF'}</button>
            
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
        </div>
    )
}  

export default CodeEditor