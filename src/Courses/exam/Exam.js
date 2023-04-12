import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Questions from "./Questions.json";
import { exportComponentAsJPEG } from "react-component-export-image";
import Certificate from "../Certificate";
import "./Exam.css";

export default function Exam() {
  const componentRef = useRef();

  const [showCertificate, setShowCertificate] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    console.log(score, isCorrect, "score , isCorrect");
    if (isCorrect) setScore(score + 1);
    console.log(score);
  };

  const handleSubmit = () => {
    if (score < 3) {
      alert("Score more than 75% to get a certificate! Your score=" + score);
    } else {
      setShowCertificate(true);
    }
  };

  return (
    <>
      <div className="container exam_page my-3">
        <div className="row">
          <form className=" my-3">
            {showCertificate ? (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <Certificate
                    ref={componentRef}
                    // score={score}
                  />
                </div>

                <div className="d-flex flex-row justify-content-center my-4">
                  <Link to="/courses">
                    <button className="btn btn-outline-primary mx-2">
                      Go to Course
                    </button>
                  </Link>
                  <button
                    className="btn btn-primary mx-2"
                    onClick={(e) => {
                      e.preventDefault();
                      exportComponentAsJPEG(componentRef);
                    }}
                  >
                    Download Certificate
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="quiz_form">
                  {Questions &&
                    Questions.map((ques, index) => {
                      return (
                        <div key={index}>
                          <div className="fs-5">
                            Q-{index + 1}.{ques.questionText}
                          </div>
                          {ques.answerOptions.map((answer, index) => {
                            return (
                              <div className="ps-5 mt-2" key={index}>
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name={ques.question_id}
                                  id={answer.answerText}
                                  value={answer.answerText}
                                />
                                <label
                                  htmlFor={answer.answerText}
                                  onClick={() => {
                                    handleAnswerOptionClick(answer.isCorrect);
                                  }}
                                  className="options d-flex flex-row"
                                >
                                  {answer.answerText}
                                </label>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  <button
                    className="btn btn-primary my-3"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSubmit();
                    }}
                  >
                    {!showCertificate ? "Submit" : "Go Back"}
                  </button>
                </div>
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
