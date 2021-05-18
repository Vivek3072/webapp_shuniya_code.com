import React, { Fragment, Component } from "react";
import axios from "axios";
import './../index.css';

import CodeEditor from '../CodeEditor/CodeEditor';

import Class from "./../Pages/Class"


export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      isSubmited: false,
      isloaded: false,
      bender: '',
      nation: '',
      person: '',
      show: '',
    };
  }
  
  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });
    var getText = this.state.texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));
    const postBody = {
      code_file_name: "a.py",
      code_input: "1",
      code_text_b64: code_text_b64,
      input_flag: "ABSENT",
    };
    var postContent = JSON.stringify(postBody);
    const headers = {
      "Content-Type": "application/json",
    };
    const res = axios
      .post(
        "http://कोड.com:8000/api/v1/web_ide/",
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
  login = () => {
    this.props.history.push('/login')
  }
  class = () => {
    this.props.history.push('/class')
  }
  handleCopy = (e) => {
    this.setState({ texteditor: e.target.value })
  }
  
  handleCode = (code) => {
    this.setState({texteditor: code})
  }
  handleChange = (e) => {
    this.setState({ texteditor: e.target.value })
  }
  handleKeyDown = evt => {
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

      this.setState({texteditor:value});
    }
  };
  render() {
    return (  
      <>
        <div className="row">
          <div className="col-sm-6 col-md-4 col-lg-4">
              <div className="ClassContainer">
              <Class 
              handleCopy={this.handleCopy}
              />
              </div>
          </div>
          <div className="col-sm-12 col-md-6 col-lg-6">
            <CodeEditor
            handleCode= {this.handleCode}
            texteditor ={this.state.texteditor}
            handleChange = {this.handleChange}
            handleKeyDown ={ this.handleKeyDown}
            />
            <div
              className="menu-bar"
              style={{ position: "relative", textAlign: "end" }}
            >
              <button
                className="btn .btn-sm btn-dark mt-4 submit-btn"
                onClick={this.submitHandler}
              >
                चलाओ कोड
                </button>
            </div>
            {this.state.isSubmited ? (
              <div>
                <h1>परिणाम</h1>
                {this.state.isloaded ? (
                  <textarea className="sub" readOnly={true} value={this.state.showtext}>
                    {" "}
                  </textarea>
                ) : (
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
        <div className="row">
          <div className="menu-bar"></div>

        </div>
      </>

    );
  }
}
