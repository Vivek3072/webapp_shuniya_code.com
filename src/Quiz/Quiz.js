// import { Button } from 'bootstrap'

import React from "react";
import { Card, Button, Col, Form, Row } from "react-bootstrap";
import "./quiz.css";

function Quiz() {
  function submitHandle(e) {
    e.preventDefault();

    console.log(answers);
  }

  const questions = [
    {
      questionText: "What is function of secondary memory in computer?",
      questionType: "mcq",
      answerOptions: [
        {
          answerText: "Execute all of the computation and logic of the program",
        },
        { answerText: "Retrieve web pages over the Internet" },
        {
          answerText:
            "Store information for long term, even beyond power cycle",
        },
        { answerText: "Take input from the user" },
      ],
    },
    {
      questionText: "What is a program?",
      questionType: "write-ups",
    },
    {
      questionText: "What is difference between a compiler and an interpreter?",
      questionType: "write-ups",
    },
    {
      questionText: 'Which of the following contains "machine code"?',
      questionType: "mcq",
      answerOptions: [
        { answerText: "The Python Interpreter" },
        { answerText: "The keyboard" },
        { answerText: "Python source file" },
        { answerText: "A word processing document" },
      ],
    },
    {
      questionText: "What is wrong with the following code:",
      questionType: "write-ups",
      codeText:
        ">>> primt 'Hello world!'\nFile \"<stdin>\", line 1\nprimt 'Hello world!'\n\t\t^\nSyntaxError: invalid syntax\n>>>",
    },
    {
      questionText:
        "Where in the computer is a variable such as “x” stored afterthe following Python line finishes?",
      questionType: "mcq",
      codeText: "x = 123",
      answerOptions: [
        { answerText: "Central processing unit" },
        { answerText: "Main Memory" },
        { answerText: "Secondary Memory" },
        { answerText: "Input Devices" },
        { answerText: "Output Devices" },
      ],
    },
    {
      questionText: "What will the following program print out:",
      questionType: "write-ups",
      codeText: "x = 43\nx = x + 1\nprint(x)",
      answerOptions: [
        { answerText: "43" },
        { answerText: "44" },
        { answerText: "x + 1" },
        {
          answerText: "Error because x = x + 1 is not possible mathematically",
        },
      ],
    },
    {
      questionText:
        "Explain each of the following using an example of a human capability: (1) Central processing unit, (2) Main Memory, (3)Secondary Memory, (4) Input Device, and (5) Output Device. For example, “What is the human equivalent to a Central Processing Unit”?",
      questionType: "write-ups",
    },
    {
      questionText: "How do you fix a “Syntax Error”?",
      questionType: "write-ups",
    },
  ];

  const answers = {
    name: "",
    submission: [
      questions.map((answer) => {
        return { answerValue: "" };
      }),
    ],
  };

  return (
    <Col>
      <h1 className="text-center">Attempt Quiz</h1>
      <Col lg={6} className="mx-auto my-0">
        <Form onSubmit={submitHandle}>
          {questions.map((question, idx) => {
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
