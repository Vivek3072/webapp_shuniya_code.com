import React, { Component } from "react";
import axios from "axios";

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      texteditor: "",
      showtext: "",
      isSubmited: false,
      isloaded: false,
    };
  }
  submitHandler = () => {
    this.setState({
      isloaded: false,
      isSubmited: true,
    });
    var getText = document.getElementById("texteditor").value;
    console.log(getText);

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
        "http://ec2-13-232-16-70.ap-south-1.compute.amazonaws.com:8000/api/v1/web_ide/",
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
  render() {
    return (
      <div>
        <br></br>
        <br></br>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12">
              <h1>कोड</h1>
              <textarea id="texteditor" className="editor_area">
                पश्य("नमस्ते दुनिया !!")
              </textarea>
              <div
                className="menu-bar"
                style={{ position: "relative", textAlign: "end" }}
              >
                <button
                  className="btn btn-lg btn-primary submit-btn"
                  onClick={this.submitHandler}
                >
                  चल कोड
                </button>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-12">
              <div className="menu-bar"></div>
              <br></br>
              <br></br>
              <br></br>

              {this.state.isSubmited ? (
                <div>
                  <h1>परिणाम</h1>
                  {this.state.isloaded ? (
                    <textarea className="sub" value={this.state.showtext}>
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
                <h3>परिणाम देखने के लिए सबमिट करें</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
