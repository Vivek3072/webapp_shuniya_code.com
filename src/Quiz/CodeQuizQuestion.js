import React, { useState, useEffect } from "react";
import { Card, Button, Col, Form, Row, Alert } from "react-bootstrap";
import "./quiz.css";
import axios from "axios";

import CodeEditor from "../CodeEditor/CodeEditor";

function CodeQuizQuestion({ question, idx, quiz_id }) {
  const [input, setInput] = useState("");
  const [customInput, setCustomInput] = useState(false);
  const [code, setCode] = useState("");
  const [texteditor, setTexteditor] = useState("");
  const [loadedTestcaseResults, setLoadedTestcaseResults] = useState(false);
  const [codeSubmitResults, setCodeSubmitResults] = useState(false);
  const [testcasesPassed, setTestcasesPassed] = useState(0);
  const [testcasesTotal, setTestcasesTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const submitHandler = async () => {
    setCodeSubmitResults(true);
    setLoadedTestcaseResults(false);
    var getText = texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));
    console.log(code_text_b64);

    const postBody = {
      user_id: localStorage.getItem("user-id"),
      ques_id: question.ques_id,
      quiz_id: quiz_id,
      code_submitted: code_text_b64,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    var postContent = JSON.stringify(postBody);
    // const code_input_b64 = btoa(unescape(encodeURIComponent(this.state.input)));
    const response = await axios.post(
      "http://कोड.com:8000/api/v1/test_case/",
      postContent,
      headers
    );

    if (response.status == 200) {
      setTestcasesPassed(response.data.total_number_of_test_cases_passed);
      setTestcasesTotal(response.data.total_number_of_test_cases);
      setLoadedTestcaseResults(true);
    } else {
      console.log("Error: " + response.status);
    }

    console.log(response.data);
  };

  const runCodeHandler = () => {
    setIsLoaded(false);
    setIsSubmited(true);
    var getText = texteditor;
    var code_text_b64 = btoa(unescape(encodeURIComponent(getText)));

    const code_input_b64 = btoa(unescape(encodeURIComponent(input)));

    const input_flag = customInput ? "PRESENT" : "ABSENT";
    const postBody = {
      code_file_name: "a.py",
      code_input_b64: customInput ? code_input_b64 : null,
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
        setShowText(res.data);
        setIsLoaded(true);
      });
  };

  const handleInput = (e) => {
    setInput(e.target.value);
  };

  const setcustomInput = (e) => {
    setCustomInput(!customInput);
  };

  const handleCode = () => {
    setTexteditor(code);
  };

  const handleChange = (e) => {
    setTexteditor(e.target.value);
  };

  const handleKeyDown = (evt) => {
    let value = texteditor,
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

      setTexteditor(value);
    }
  };

  return (
    <>
      <Card className="my-5 px-4 py-4 shadow-box card-bg" key={"code" + idx}>
        <Card.Title>{"Question " + idx}</Card.Title>
        <Card.Body>
          <Card.Text>
            <strong>{question.questionText}</strong>
          </Card.Text>
          <CodeEditor
            handleCode={handleCode}
            texteditor={texteditor}
            handleChange={handleChange}
            handleKeyDown={handleKeyDown}
            input={input}
            customInput={customInput}
            handleInput={handleInput}
            setcustomInput={setcustomInput}
          />

          {customInput && (
            <button
              className="btn btn-primary my-2 mx-1 submit-btn"
              style={{ zIndex: 100 }}
              onClick={runCodeHandler}
            >
              चल कोड
            </button>
          )}
          <button
            className="btn btn-primary my-2 mx-1 submit-btn"
            style={{ zIndex: 100 }}
            onClick={submitHandler}
          >
            Submit Code
          </button>
          {isSubmited ? (
            <div>
              <h3 className="pb-3">परिणाम</h3>
              {isLoaded ? (
                <textarea
                  className="sub textarea"
                  readOnly={true}
                  value={showText}
                >
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
            <h5></h5>
          )}
          {codeSubmitResults &&
            (!loadedTestcaseResults ? (
              <Card.Text>Checking testcases..</Card.Text>
            ) : (
              <Card.Text>
                Testcases passed:{" "}
                <strong>{`${testcasesPassed}/${testcasesTotal}`}</strong>
              </Card.Text>
            ))}
        </Card.Body>
      </Card>
    </>
  );
}

export default CodeQuizQuestion;
