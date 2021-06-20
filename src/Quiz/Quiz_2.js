// import { Button } from 'bootstrap'

import React, { useState, useEffect } from "react";
import { Card, Button, Col, Form, Row, Alert } from "react-bootstrap";
import "./quiz.css";
import { useHistory } from "react-router-dom";
import CodeQuestions from "./codeQuestionsList.json";
import CodeQuizQuestion from "./CodeQuizQuestion";

// import questions from "./questionList.json";

function Quiz_2() {
  
  let history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("user-id") === null) {
      alert("Please login to attempt quiz");
      history.push("/");
    }
  }, []);

  return (
    <Col id="top">
      <h1 className="text-center">Coding Quiz</h1>
      <Col lg={6} md={12} className="mx-auto my-0">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >

          {CodeQuestions.questions.map((question, idx) => {
            return (
              <CodeQuizQuestion
                question={question}
                idx={idx + 1}
                quiz_id={CodeQuestions["quiz-id"]}
              />
            );
          })}
        </Form>
        
      </Col>
    </Col>
  );
}

export default Quiz_2;