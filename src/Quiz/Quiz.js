// import { Button } from 'bootstrap'

import React, { useState, useEffect } from "react";
import { Card, Button, Col, Form, Row, Alert } from "react-bootstrap";
import "./quiz.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import QuizResultsModal from "./QuizResultsModal";
// import questions from "./questionList.json";

function Quiz() {
  const [questionsList, setQuestionsList] = useState([]);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [displayAlert, setDisplayAlert] = useState(false);
  const [quizID, setQuizID] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [totalMcqCount, setTotalMcqCount] = useState(0);
  const [displayResultsModal, setdisplayResultsModal] = useState(false);
  const [reattempt, setReattempt] = useState(false);

  let history = useHistory();

  async function submitHandle(e) {
    e.preventDefault();
    setUserAnswers([
      ...questionsList.map((question, idx) => {
        return answers.submission[0][idx][idx + 1];
      }),
    ]);

    // console.log(correctAnswerCount);
    // console.log(userAnswers[0]);
    // console.log(
    //   questionsList[0].answerOptions[answerKeys[0].charCodeAt(0) - 97][
    //     answerKeys[0]
    //   ]
    // );
    setDisplayAlert(true);
    answers["user_id"] = localStorage.getItem("user-id");
    let idx = 0;
    // console.log(
    //   answers.submission[0][idx][idx + 1] ===
    //     questionsList[idx].answerOptions[answerKeys[idx].charCodeAt(0) - 97][
    //       answerKeys[idx]
    //     ]
    // );
    // console.log(questionsList[0].answerOptions);
    if (!answers["user_id"]) {
      setSubmitError(true);
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } else {
      var answerContent = JSON.stringify(answers);
      const headers = {
        "Content-Type": "application/json",
      };
      const response = axios
        .post("http://कोड.com:8000/api/v1/submit_quiz/", answerContent, headers)
        .then((res) => {
          console.log(res.data);
          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
          }, 5000);
          setdisplayResultsModal(true);
        })
        .catch((res) => {
          setSubmitError(true);
          setTimeout(() => {
            setSubmitError(false);
          }, 5000);
        });
    }
  }

  useEffect(() => {
    let totalMcqs = 0;
    let correctMcqs = 0;
    questionsList.forEach((question, idx) => {
      if (question.questionType === "mcq") {
        totalMcqs++;
        if (
          userAnswers[idx] ===
          question.answerOptions[answerKeys[idx].charCodeAt(0) - 97][
            answerKeys[idx]
          ]
        ) {
          correctMcqs++;
        }
        // console.log(totalMcqs);
        // console.log(correctMcqs);
        // console.log(totalMcqs);
      }
    });
    setCorrectAnswerCount(correctMcqs);
    setTotalMcqCount(totalMcqs);
    console.log(correctAnswerCount / totalMcqCount);
  }, [userAnswers]);

  useEffect(() => {
    if (localStorage.getItem("user-id") === null) {
      alert("Please login to attempt quiz");
      history.push("/");
    } else {
      QuestionApiHandle();
    }
  }, []);

  async function QuestionApiHandle() {
    const response = await axios.get(
      "http://कोड.com:8000/api/v1/get_quiz_questions/quiz_1/"
    );
    const questionsData = await response.data;
    // console.log(questionsData.questions);
    // console.log(
    //   questionsData.questions[0].answerOptions[
    //     answerKeys[0][0].charCodeAt(0) - 97
    //   ][answerKeys[0][0]]
    // );
    // console.log(answerKeys[0]);
    setQuestionsList(questionsData.questions);

    // setQuestionsList(questions.questions);

    setQuizID(questionsData.quiz_id);
  }

  const answerKeys = [...questionsList.map((question) => question.answer_key)];
  // let userAnswers = [];
  // console.log(questionsList);
  // console.log(userAnswers);
  // console.log(answerKeys);

  const answers = {
    user_id: "",
    quiz_id: quizID,
    submission: [
      questionsList.map((question) => {
        return {
          [question.question_serial_number]: "",
        };
      }),
    ],
  };

  return (
    <Col id="top">
      <h1 className="text-center">Attempt Quiz</h1>
      <Col lg={6} className="mx-auto my-0">
        <Form onSubmit={submitHandle}>
          {questionsList.map((question, idx) => {
            return (
              <>
                <Card
                  className="my-5 px-4 py-4 shadow-box card-bg"
                  key={"ques" + idx}
                >
                  <Card.Title>{"Question " + (idx + 1)}</Card.Title>
                  {question.questionText.map((line) => (
                    <Card.Text>
                      <strong>{line}</strong>
                    </Card.Text>
                  ))}

                  {question.codeText && (
                    <Card.Text>
                      <pre>{question.codeText}</pre>
                    </Card.Text>
                  )}
                  {question.questionType === "mcq" ? (
                    <fieldset>
                      <Form.Group
                        as={Row}
                        className="card.bg"
                        controlId={"question" + idx}
                        onChange={(e) => {
                          answers.submission[0][idx][idx + 1] = e.target.value;
                        }}
                      >
                        <Form.Label hidden>{"question" + idx}</Form.Label>
                        <Col sm={10}>
                          {question.answerOptions.map((option, optidx) => {
                            return (
                              <Form.Check
                                type="radio"
                                label={Object.values(option)}
                                value={Object.values(option)}
                                name={"q" + idx + "radios"}
                                id={"q" + idx + "-opt" + optidx}
                                key={idx + "-" + optidx}
                              />
                            );
                          })}
                        </Col>
                      </Form.Group>
                    </fieldset>
                  ) : (
                    <Form.Group
                      as={Row}
                      className="mb-3"
                      controlId={"question" + idx}
                      onChange={(e) => {
                        answers.submission[0][idx].answerValue = e.target.value;
                      }}
                    >
                      <Form.Label hidden>{"question" + idx}</Form.Label>
                      <Form.Control
                        as="textarea"
                        placeholder="Your answer here.."
                      />
                    </Form.Group>
                  )}
                </Card>
                {question.questionType === "mcq" &&
                  displayAlert &&
                  userAnswers[idx] !== "" &&
                  (userAnswers[idx] ===
                  questionsList[idx].answerOptions[
                    answerKeys[idx].charCodeAt(0) - 97
                  ][answerKeys[idx]] ? (
                    <Alert variant="success">Correct Answer</Alert>
                  ) : (
                    <Alert variant="danger">Incorrect Answer</Alert>
                  ))}
                {question.questionType === "write-ups" &&
                  displayAlert &&
                    <Alert variant="success">{question.answer_key}</Alert>
                }
                {/* {question.questionType === "mcq" &&
                  answers.submission[0][idx][idx + 1] !==
                    question.answerOptions[answerKeys[idx].charCodeAt(0) - 97][
                      answerKeys[idx]
                    ] &&
                  displayAlert && (
                    
                  )} */}
              </>
            );
          })}
          {submitError && (
            <Alert variant="danger">
              Error during submission. Please try again.
            </Alert>
          )}
          {submitSuccess && (
            <Alert variant="success">
              Your submission was recorded. Thank you.
            </Alert>
          )}
          <Button
            variant="primary"
            className="mx-auto mb-4 option-button"
            type="submit"
            block
            size="lg"
            style={{ width: "10rem" }}
          >
            Submit
          </Button>

          <Button
            href="/quiz"
            variant="primary"
            className="mx-auto mb-4 option-button"
            type="submit"
            block
            size="lg"
            style={{ width: "14rem" }}
          >
            Reset answers
          </Button>
        </Form>
        {displayResultsModal && (
          <QuizResultsModal
            percentage={
              totalMcqCount === NaN ? 0 : correctAnswerCount / totalMcqCount
            }
          />
        )}
      </Col>
    </Col>
  );
}

export default Quiz;
