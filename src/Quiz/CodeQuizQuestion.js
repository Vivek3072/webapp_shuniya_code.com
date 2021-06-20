import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Col,
  Form,
  Row,
  Alert,
  ListGroup,
} from "react-bootstrap";
import "./quiz.css";
import axios from "axios";
import TestcaseData from "./TestcaseData";
import CodeEditor from "../CodeEditor/CodeEditor";

function CodeQuizQuestion({ question, idx, quiz_id }) {
  const [input, setInput] = useState("");
  const [customInput, setCustomInput] = useState(false);
  const [code, setCode] = useState("");
  const [texteditor, setTexteditor] = useState("");
  const [loadedTestcaseResults, setLoadedTestcaseResults] = useState(false);
  const [codeSubmitResults, setCodeSubmitResults] = useState(false);
  const [testCaseResults, setTestCaseResults] = useState({});
  const [testcasesPassed, setTestcasesPassed] = useState(0);
  const [testcasesTotal, setTestcasesTotal] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showText, setShowText] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [testcaseInfo, setTestcaseInfo] = useState(1);

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
      setTestCaseResults(response.data);
      console.log(response.data);
      setLoadedTestcaseResults(true);
    } else {
      console.log("Error: " + response.status);
    }
  };
<<<<<<< HEAD
  
=======
>>>>>>> 3bb1a12c4c9add020e34479e52ba6bc7827967c3

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
<<<<<<< HEAD
            <p>{question.sampleInput_1}<br/>{question.sampleOutput_1}</p>
            <p>{question.sampleInput_2}<br/>{question.sampleOutput_2}</p>
=======
>>>>>>> 3bb1a12c4c9add020e34479e52ba6bc7827967c3
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
          <Row>
            <Col>
              {codeSubmitResults &&
                (!loadedTestcaseResults ? (
                  <Card.Text>Checking testcases..</Card.Text>
                ) : (
                  <ListGroup className="test-case-list">
                    {Object.keys(testCaseResults)
                      .filter(
                        (key) =>
                          key.slice(0, 9) + key.slice(-7) === "test_case_status"
                      )
                      .map((key, idx) => {
                        return testCaseResults[key] === "PASSED" ? (
                          <ListGroup.Item
                            action
                            className="quiz-testcase-success"
                            onClick={() => {
                              setTestcaseInfo(idx + 1);
                            }}
                          >
                            {"Testcase " +
                              (idx + 1) +
                              ": " +
                              testCaseResults[key]}
                          </ListGroup.Item>
                        ) : (
                          <ListGroup.Item
                            action
                            className="quiz-testcase-failure"
                            onClick={() => {
                              setTestcaseInfo(idx + 1);
                            }}
                          >
                            {" "}
                            {"Testcase " +
                              (idx + 1) +
                              ": " +
                              testCaseResults[key]}{" "}
                          </ListGroup.Item>
                        );
                      })}
                  </ListGroup>
                ))}
            </Col>
            <Col>
              {loadedTestcaseResults && (
                <TestcaseData
                  testCaseResults={testCaseResults}
                  testCaseNumber={testcaseInfo}
                />
              )}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </>
  );
}

<<<<<<< HEAD
export default CodeQuizQuestion;
=======
export default CodeQuizQuestion;
>>>>>>> 3bb1a12c4c9add020e34479e52ba6bc7827967c3
