// import { Button } from 'bootstrap'

import React, { useState, useEffect } from "react";
import { Card, Button, Col, Form, Row, Alert } from "react-bootstrap";
import "./quiz.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
// import questions from "./questionList.json";

function Quiz() {
  const [questionsList, setQuestionsList] = useState([]);
  const [submitError, setSubmitError] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [quizID, setQuizID] = useState("");

  let history = useHistory();

  async function submitHandle(e) {
    e.preventDefault();
    answers["user_id"] = localStorage.getItem("user-id");
    if (!answers["user_id"]) {
      setSubmitError(true);
      setTimeout(() => {
        setSubmitError(false);
      }, 5000);
    } else {
      const response = await axios.post(
        "http://कोड.com:8000/api/v1/submit_quiz/",
        answers
      );
      try {
        if (response.data == "Done") {
          setSubmitSuccess(true);
          setTimeout(() => {
            setSubmitSuccess(false);
            history.push("/");
          }, 5000);
        } else {
          setSubmitError(true);
          setTimeout(() => {
            setSubmitError(false);
          }, 5000);
        }
      } catch {
        setSubmitError(true);
        setTimeout(() => {
          setSubmitError(false);
        }, 5000);
      }
    }
  }

  useEffect(() => {
    QuestionApiHandle();
  }, []);

  async function QuestionApiHandle() {
    const response = await axios.get(
      "http://कोड.com:8000/api/v1/get_quiz_questions/quiz_1/"
    );
    const questionsData = await response.data;
    setQuestionsList(questionsData.questions);
    // setQuestionsList(questions.questions);

    setQuizID(questionsData.quiz_id);
  }

  const answers = {
    user_id: "",
    quiz_id: quizID,
    submission: [
      questionsList.map((answer) => {
        return { answerValue: "" };
      }),
    ],
  };

  return (
    <Col>
      <h1 className="text-center">Attempt Quiz</h1>
      <Col lg={6} className="mx-auto my-0">
        <Form onSubmit={submitHandle}>
          {questionsList.map((question, idx) => {
            return (
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
                        answers.submission[0][idx].answerValue = e.target.value;
                      }}
                    >
                      <Form.Label hidden>{"question" + idx}</Form.Label>
                      <Col sm={10}>
                        {question.answerOptions.map((option, optidx) => {
                          return (
                            <Form.Check
                              type="radio"
                              label={option.answerText}
                              value={option.answerText}
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
        </Form>
      </Col>
    </Col>
  );
}

export default Quiz;
