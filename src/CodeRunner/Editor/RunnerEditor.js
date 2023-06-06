import React, { Fragment, Component } from "react";
import axios from "axios";
// import './Index.css'
import "./runnerEditor.css";

import CodeEditor from "./CodeEditor.js";
import RunnerEditorOutput from "./RunnerEditorOutput";
// import QuestionList from "../QuestionList";
import { Col, Row } from "react-bootstrap";
// import data from "../data.json";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      ques_id: this.props.ques_id,
      language: this.props.language,
      input: "",
      customInput: false,
      isSubmited: false,
      showSnippet: false,
      isloaded: false,
      data: [],
      show: "",
      submitted: false,
      output: "hello",
    };

    this.componentRef = React.createRef();
  }

  // fetching the data################

  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });

    var getText = this.state.texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));

    const code_input_b64 = btoa(unescape(encodeURIComponent(this.state.input)));

    // input_flag = this.state.customInput ? "PRESENT" : "ABSENT";
    const postBody = {
      content: code_text_b64,
    };
    if (code_text_b64 === "") {
      alert("Please enter some code before submitting");
      window.location.reload();
      return;
    }

    // console.log(postBody);
    var content = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };
    try {
      const res = axios
        .post(
          `http://43.204.229.206:8000/api/v1/check/${this.props.ques_id}/`,
          content,
          headers
        )
        .then((res) => {
          console.log("data in response", res.data);
          this.setState({
            data: res.data,
            isloaded: true,
          });
          this.props.scoreInc(100);
        });
    } catch (error) {
      console.log("Error: " + error);
      this.setState({
        // isloaded: false,
        isSubmited: false,
      });
    }
    // console.log(res);
    // this.setState({ submitted: true });
  };

  handleInput = (e) => {
    this.setState({ input: e.target.value });
  };

  setcustomInput = (e) => {
    this.setState({ customInput: !this.state.customInput });
  };

  handleCopy = (e) => {
    this.setState({ texteditor: e.target.value });
  };
  handleCode = (code) => {
    this.setState({ texteditor: code });
  };
  handleChange = (e) => {
    this.setState({ texteditor: e.target.value });
  };
  handleKeyDown = (evt) => {
    let value = this.state.texteditor,
      selStartPos = evt.currentTarget.selectionStart;

    // handle 4-space indent on
    if (evt.key === "Tab") {
      value =
        value.substring(0, selStartPos) +
        "    " +
        value.substring(selStartPos, value.length);
      evt.currentTarget.selectionStart = selStartPos + 3;
      evt.currentTarget.selectionEnd = selStartPos + 4;
      evt.preventDefault();

      this.setState({ texteditor: value });
    }
  };
  render() {
    return (
      <>
        {/* <hr style={{ marginBottom: "30px" }} /> */}
        <div
          className="row page"
          ref={this.props.editor}
          style={{
            width: window.innerWidth > 800 ? this.props.size + "px" : "inherit",
          }}
        >
          <Row className="codeScreens">
            <Col>
              <h3>
                <b>Code Editor</b>
              </h3>

              <div className="code">
                <CodeEditor
                  handleCode={this.handleCode}
                  texteditor={this.state.texteditor}
                  handleChange={this.handleChange}
                  handleKeyDown={this.handleKeyDown}
                  input={this.state.input}
                  customInput={this.state.customInput}
                  handleInput={this.handleInput}
                  setcustomInput={this.setcustomInput}
                />
                <div
                  className="menu-bar"
                  style={{ position: "relative", textAlign: "center" }}
                >
                  <button
                    className="btn btn-lg btn-primary"
                    style={{
                      zIndex: 100,
                      backgroundColor: "#007bff",
                      marginTop: "10px",
                      fontSize: "0.95rem",
                    }}
                    onClick={this.submitHandler}
                  >
                    {this.state.submitted ? "Submitted" : "चल कोड"}
                  </button>
                </div>
              </div>
            </Col>
            {/* // Test cases component  */}
            {this.state.isSubmited ? (
              <Col>
                <h3>
                  <b>परिणाम</b>
                </h3>
                <div className="output_box">
                  <div>
                    {this.state.isloaded ? (
                      <RunnerEditorOutput data={this.state.data} />
                    ) : (
                      <div>
                        <h6>प्रोसेसिंग....................</h6>
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                </div>
              </Col>
            ) : null}
          </Row>
        </div>
        <div className="row">
          <div className="menu-bar"></div>
        </div>
      </>
    );
  }
}
