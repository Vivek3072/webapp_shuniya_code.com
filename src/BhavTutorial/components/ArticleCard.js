import React, { Fragment, Component } from "react";
import { Card } from "react-bootstrap";
import CodeEditor from "./CodeEditor/CodeEditor";
import axios from "axios";
import articles from "./articleData/articleData";
import articlesHindi from "./articleData/aricleDataHindi";
import { CardText } from "react-bootstrap-icons";
import "./components.css";

// function ArticleCard({ title, date, texts }) {
//   return (

//   );
// }

class ArticleCard extends Component {
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
      article: articles.find((arti) => arti.titleURL === this.props.titleLink),
      date: new Date(),
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

  // handleArticleRefresh = (e) => {
  //   this.setState({
  //     article: articles.find(
  //       (arti) => arti.titleURL === this.props.match.params.tutorialTitle
  //     ),
  //   });
  // };

  render() {
    return (
      <Card>
        {this.state.article ? (
          <Card.Body className="text-start px-3">
            <Card.Title className="py-3">
              <h1>{this.state.article.title}</h1>
            </Card.Title>
            {/* <Card.Subtitle className="mb-2 text-muted">
            {`${this.date.getDate().toString()}/${this.date
              .getMonth()
              .toString()}/${this.date.getFullYear().toString()}`}
          </Card.Subtitle> */}
            {this.state.article.texts.map((text) => (
              <Card.Text>{text}</Card.Text>
            ))}

            <CodeEditor
              handleCode={this.handleCode}
              texteditor={this.state.texteditor}
              handleChange={this.handleChange}
              handleKeyDown={this.handleKeyDown}
              input={this.state.input}
              customInput={this.state.customInput}
              handleInput={this.handleInput}
              setcustomInput={this.setcustomInput}
            ></CodeEditor>
            <button
              className="btn btn-primary my-3"
              style={{ zIndex: 100, backgroundColor: '#03182e'}}
              onClick={this.submitHandler}
            >
              चल कोड
            </button>
            {this.state.isSubmited ? (
              <div>
                <Card.Text>परिणाम</Card.Text>
                {this.state.isloaded ? (
                  <textarea
                    className="sub textarea bg-light"
                    readOnly={true}
                    value={this.state.showtext}
                  >
                    {" "}
                  </textarea>
                ) : (
                  <Card.Text>
                    <h6>प्रोसेसिंग....................</h6>
                    <div className="loader"></div>
                  </Card.Text>
                )}
              </div>
            ) : (
              <Card.Text>परिणाम देखने के लिए सबमिट करें</Card.Text>
            )}
          </Card.Body>
        ) : (
          <Card.Body className="max-height">
            <Card.Title>Article yet to be added</Card.Title>
          </Card.Body>
        )}
      </Card>
    );
  }
}

export default ArticleCard;