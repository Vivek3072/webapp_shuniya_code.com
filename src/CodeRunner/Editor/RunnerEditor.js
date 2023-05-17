import React, { Fragment, Component } from "react";
import axios from "axios";
// import './Index.css'
import "./runnerEditor.css";

import CodeEditor from "./CodeEditor.js";
// import QuestionList from "../QuestionList";
import { Col, Row } from "react-bootstrap";
import data from "../data.json";
import RunnerEditorOutput from "./RunnerEditorOutput";

// import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      ques_id: this.props.ques_id,
      input: "",
      customInput: false,
      isSubmited: false,
      showSnippet: false,
      isloaded: false,
      data: [],
      show: "",
      output: "hello",
    };
    this.fetchData();

    this.componentRef = React.createRef();
    console.log("data this ", this.data);
  }

  // fetching the data################
  fetchData = async () => {
    try {
      console.log("inside fetchData");
      const response = await axios.get("../data.json");
      // setData(response.data);
      console.log("this data ", response.data);
      this.data = response.data;
    } catch (error) {
      console.error(error);
    }
  };
  // this.fetchData();

  // fetching the data################

  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });
    console.log("inside submitHandler");
    var getText = this.state.texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));

    const code_input_b64 = btoa(unescape(encodeURIComponent(this.state.input)));

    const input_flag = this.state.customInput ? "PRESENT" : "ABSENT";
    const postBody = {
      code_file_name: "a.py",
      code_input_b64: this.state.customInput ? code_input_b64 : null,
      code_text_b64: code_text_b64,
      input_flag: input_flag,
    };

    console.log(postBody);
    var postContent = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };
    const res = axios
      .post(
        `http://कोड.com:8000/api/v1/web_ide/`,
        // `http://कोड.com:8000/api/v1/web_ide/${this.ques_id}`,
        postContent,
        headers
      )
      .then((res) => {
        this.setState({
          showtext: res.data,
          isloaded: true,
        });
      });
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
                    }}
                    onClick={this.submitHandler}
                  >
                    चल कोड
                  </button>
                </div>
              </div>
            </Col>
            {this.state.isSubmited ? (
              <Col>
                <h3>
                  <b>परिणाम</b>
                </h3>
                <div className="output_box">
                  <div>
                    {this.state.isloaded ? (
                      <RunnerEditorOutput data={this.data} />
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
