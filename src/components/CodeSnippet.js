import Highlight, { defaultProps } from "prism-react-renderer";
import theme from "prism-react-renderer/themes/nightOwl";
import { Pre } from "./styles";

const CodeSnippet = ({syntaxedValue}) => {
    const code = syntaxedValue.trim()
    return (
        <div >
            <Highlight {...defaultProps} theme={theme} code={code} language="py">
    {({ className, style, tokens, getLineProps, getTokenProps }) => (
      <Pre className={className} style={style}>
        {tokens.map((line, i) => (
          <div {...getLineProps({ line, key: i })}>
            {line.map((token, key) => (
              <span {...getTokenProps({ token, key })} />
            ))}
          </div>
        ))}
      </Pre>
    )}
  </Highlight>
            </div>

    )
}

export default CodeSnippet;