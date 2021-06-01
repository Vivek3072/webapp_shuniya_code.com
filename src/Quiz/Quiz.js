// import { Button } from 'bootstrap'

import React, { useState, useEffect } from "react";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import "./quiz.css";
import axios from "axios";
// import answers from "./answerSubmission.json";
// import questionList from "./questionList.json";

function Quiz() {
  const [questionsList, setQuestionsList] = useState([]);
  function submitHandle(e) {
    e.preventDefault();
    answers["user-id"] = localStorage.getItem("user-id");
    console.log(answers);
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
  }

  const answers = {
    "user-id": "",
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
                <Card.Text>
                  <strong>{question.questionText}</strong>
                </Card.Text>
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
