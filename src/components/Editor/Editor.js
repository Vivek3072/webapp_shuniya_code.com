import React, { Component } from "react";
import axios from "axios";
import "./Index.css";
import CodeEditor from "../../CodeEditor/CodeEditor";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      input: "",
      customInput: false,
      isSubmited: false,
      showSnippet: false,
      isloaded: false,
      show: "",
    };
    this.componentRef = React.createRef();
  }

  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });
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
      .post("http://कोड.com:8000/api/v1/web_ide/", postContent, headers)
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
        <div className="container-fluid">
          <div className="row my-5">
            <div className="col-lg-6 col-sm-6">
              <div className="mb-4 fs-3 fw-semibold">
                अपना कोड नीचे लिखें...
              </div>
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

              <div className="d-flex flex-row justify-content-end">
                {/* <button
                  className="btn btn-outline-secondary d-block ms-auto my-2"
                  onClick={this.handleClearClick}                >
                  कोड मिटायें
                </button> */}
                <button
                  className="btn btn-primary d-block ms-2 my-2"
                  onClick={this.submitHandler}
                >
                  चल
                </button>
              </div>
            </div>
            <div className="col-lg-6 col-sm-6">
              <div className="mb-4 fs-3 fw-semibold"> परिणाम </div>
              <div className="output_box">
                {this.state.isSubmited ? (
                  <div>
                    {this.state.isloaded ? (
                      <textarea className="output_textarea">
                        {this.state.showtext}
                      </textarea>
                    ) : (
                      // <textarea
                      //   className="output_textarea"
                      //   readOnly={true}
                      //   value={this.state.showtext}
                      // ></textarea>
                      <div>
                        <h6>प्रोसेसिंग....................</h6>
                        <div className="loader"></div>
                      </div>
                    )}
                  </div>
                ) : (
                  <h5>परिणाम देखने के लिए सबमिट करें</h5>
                )}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
