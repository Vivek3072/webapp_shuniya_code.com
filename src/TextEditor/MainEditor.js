import React, { Component } from "react";
import PropTypes from "prop-types";
import getInputSelection, { setCaretPosition } from "./Translator/utils";
import getCaretCoordinates from "textarea-caret";
import classes from "./Translator/styles.module.css";


// import { ReactTransliterate } from "./Translator/index";
import { EditorState, ContentState, Modifier } from "draft-js";

import { Editor} from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// const KEY_UP = 38;
// const KEY_DOWN = 40;
// const KEY_RETURN = 13;
// const KEY_ENTER = 14;
// const KEY_ESCAPE = 27;
// const KEY_TAB = 9;

// const OPTION_LIST_Y_OFFSET = 10;
// const OPTION_LIST_MIN_WIDTH = 100;
class CustomOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
  };

  addStar = () => {
    const { editorState, onChange } = this.props;
    const contentState = Modifier.replaceText(
      editorState.getCurrentContent(),
      editorState.getSelection(),
      "⭐",
      editorState.getCurrentInlineStyle()
    );
    onChange(EditorState.push(editorState, contentState, "insert-characters"));
  };

  render() {
    return (
      <>
        <div onClick={this.addStar}>⭐</div>
      </>
    );
  }
}


class ControlledEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      KEY_UP: 38,
      KEY_DOWN: 40,
      KEY_RETURN: 13,
      KEY_ENTER: 14,
      KEY_ESCAPE: 27,
      KEY_TAB: 9,
      OPTION_LIST_Y_OFFSET: 10,
      OPTION_LIST_MIN_WIDTH: 100,
      options: [],
      left: 0,
      top: 0,
      selection: 0,
      matchStart: -1,
      matchEnd: -1,
    };
    this.inputRef = React.createRef();
  }

  getSuggestions = async (lastWord) => {
    // fetch suggestion from api
    // const url = `https://www.google.com/inputtools/request?ime=transliteration_en_${lang}&num=5&cp=0&cs=0&ie=utf-8&oe=utf-8&app=jsapi&text=${lastWord}`;
    const url = `https://inputtools.google.com/request?text=${lastWord}&itc=${this.props.lang}-t-i0-und&num=13&cp=0&cs=1&ie=utf-8&oe=utf-8&app=demopage`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      if (data && data[0] === "SUCCESS") {
        let found = data[1][0][1];
        found = found.slice(0, this.props.maxOptions);
        this.setState({ options: found });
      }
    } catch (e) {
      // catch error
      console.error("There was an error with transliteration", e);
    }
  };

  handleChange = (e) => {
    const value = e.target.value;

    // bubble up event to the parent component
    this.props.onChange(e);

    // get the current index of the cursor
    const caret = getInputSelection(e.target).end;
    const input = this.inputRef.current;
    const caretPos = getCaretCoordinates(input, caret);

    console.log(caret, input, caretPos);

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
    this.setState({ matchStart: indexOfLastSpace + 1 });
    this.setState({ MatchEnd: caret - 1 });

    // currentWord is the word that is being typed
    const currentWord = value.slice(indexOfLastSpace + 1, caret);
    if (currentWord) {
      // make an api call to fetch suggestions
      this.getSuggestions(currentWord);

      const rect = input.getBoundingClientRect();

      // get the position of the top left corner of the suggestion box
      // and save it to state
      const top = caretPos.top + input.offsetTop;
      const left = Math.min(
        caretPos.left + input.offsetLeft - this.state.OPTION_LIST_Y_OFFSET,
        input.offsetLeft + rect.width - this.state.OPTION_LIST_MIN_WIDTH
      );

      this.setState({ top: top });
      this.setState({ left: left });
    } else {
      this.reset();
    }
  };

  reset = () => {
    // reset the component
    this.setState({ selection: 0 });
    this.setState({ options: [] });
  };

  handleKeyDown = (event) => {
    const helperVisible = this.state.options.length > 0;

    if (helperVisible) {
      switch (event.keyCode) {
        case this.state.KEY_ESCAPE:
          event.preventDefault();
          this.reset();
          break;
        case this.state.KEY_UP:
          event.preventDefault();
          this.setState({
            selection:
              (this.state.options.length + this.state.selection - 1) %
              this.state.options.length,
          });
          break;
        case this.state.KEY_DOWN:
          event.preventDefault();
          this.setState({
            selection: (this.state.selection + 1) % this.state.options.length,
          });
          break;
        case this.state.KEY_ENTER:
        case this.state.KEY_RETURN:
        case this.state.KEY_TAB:
          event.preventDefault();
          this.handleSelection(this.state.selection);
          break;
        default:
          this.onKeyDown(event);
          break;
      }
    } else {
      this.onKeyDown(event);
    }
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
    // console.log(editorState);
  };

  render() {
    const { editorState } = this.state;
    return (
      <div>
        <Editor
          editorState={editorState}
          ref={this.inputRef}
          wrapperClassName="demo-wrapper"
          editorClassName="demo-editor"
          toolbarCustomButtons={[<CustomOption />]}
          onEditorStateChange={this.onEditorStateChange}
          onKeyDown={this.handleKeyDown}
          mention={{
            separator: " ",
            trigger: "@",
            suggestions: [
              { text: "APPLE", value: "apple" },
              { text: "BANANA", value: "banana" },
              { text: "CHERRY", value: "cherry", url: "cherry" },
              { text: "DURIAN", value: "durian", url: "durian" },
              { text: "EGGFRUIT", value: "eggfruit", url: "eggfruit" },
              { text: "FIG", value: "fig", url: "fig" },
              { text: "GRAPEFRUIT", value: "grapefruit", url: "grapefruit" },
              { text: "HONEYDEW", value: "honeydew", url: "honeydew" },
            ],
          }}
        />
        {this.state.options.length > 0 && (
          <ul
            style={{
              left: `${this.state.left + this.props.offsetX}px`,
              top: `${this.state.top + this.props.offsetY}px`,
              position: "absolute",
              width: "auto",
            }}
            className={classes.ReactTransliterate}
          >
            {this.state.options.map((item, index) => (
              <li
                className={
                  index === this.state.selection ? classes.Active : null
                }
                style={
                  index === this.state.selection
                    ? this.props.activeItemStyles || {}
                    : {}
                }
                onMouseEnter={() => {
                  this.setState({ selection: index });
                }}
                onClick={() => this.handleSelection(index)}
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
}

export default ControlledEditor;
