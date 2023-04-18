import React, { Fragment, Component } from "react";
import axios from "axios";
import './Index.css'

import CodeEditor from '../../CodeEditor/CodeEditor';
// import QuestionList from "../QuestionList";
import {Col, Row} from "react-bootstrap";



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
      show: '',
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

    const code_input_b64 = btoa(unescape(encodeURIComponent(this.state.input)))

    const input_flag = this.state.customInput ? "PRESENT" : "ABSENT"
    const postBody = {
      code_file_name: "a.py",
      code_input_b64: this.state.customInput ? code_input_b64 : null,
      code_text_b64: code_text_b64,
      input_flag: input_flag,
    };
    console.log(postBody)
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

  handleInput = (e) => {
    this.setState({ input: e.target.value})
  }

  setcustomInput = (e ) => {
    this.setState({customInput: !this.state.customInput})
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
        <div className="row page" >
          <Row>
            <Col>
            <div className='code'>
            <CodeEditor
            handleCode= {this.handleCode}
            texteditor ={this.state.texteditor}
            handleChange = {this.handleChange}
            handleKeyDown ={ this.handleKeyDown}
            input ={this.state.input}
            customInput = {this.state.customInput}
            handleInput={this.handleInput}
            setcustomInput = {this.setcustomInput}
            />
            <div
              className="menu-bar"
              style={{ position: "relative", textAlign: "end" }}
            >
              <button
                className="btn btn-lg btn-primary"
                style={{zIndex: 100, backgroundColor: '#03182e'}}
                onClick={this.submitHandler}
              >
                चल कोड
              </button>
            </div>
            </div>
            </Col>
            <Col>
            <h3><b>परिणाम</b></h3>
            <div className='output_box'>
            {this.state.isSubmited ? (
              <div>
                {this.state.isloaded ? (
                  <textarea className="sub textarea" readOnly={true} value={this.state.showtext}>
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
            </Col>
          </Row>
        </div>
        <div className="row">
          <div className="menu-bar"></div>

        </div>
      </>

    );
  }
}
