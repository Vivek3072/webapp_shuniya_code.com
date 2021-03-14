import React, {Fragment, } from 'react';
import { ReactTransliterate } from "./Translator/index";

//using context to get the texteditor state
//then

import Highlight, { defaultProps } from 'prism-react-renderer'
import theme from 'prism-react-renderer/themes/nightOwl'


const styles = {
    root: {
      boxSizing: 'border-box',
      fontFamily: '"Dank Mono", "Fira Code", monospace',
      ...theme.plain
    }
  }


const CodeEditor = ({texteditor, handleChange, handleKeyDown, handleCode}) => {
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
            <ReactTransliterate 
                language="python"
                Component="textarea"
                highlight={highlight}
                value={texteditor}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                padding={14}
                style={styles.root}
                lang="hi"
                className="rounded "
              />
        </div>
    )
}  

export default CodeEditor