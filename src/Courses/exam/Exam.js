import React, { useState, useRef, useEffect } from "react";
// import { Link } from "react-router-dom";
import Questions from "./Questions.json";
// import { exportComponentAsJPEG } from "react-component-export-image";
// import Certificate from "../Certificate";
import "./Exam.css";
import axios from "axios";
import ScoreCard from "../ScoreCard";

export default function Exam() {
  // const componentRef = useRef();
  const username = localStorage.getItem("user-id");
  const [showCertificate, setShowCertificate] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerOptionClick = (isCorrect) => {
    console.log(score, isCorrect, "score , isCorrect");
    isCorrect && setScore(score + 1);
    console.log(score);
  };
  const handleSubmit = async () => {
    setShowCertificate(true);

    const response = await axios
      .post(
        "https://getform.io/f/db1827df-6f49-4a9c-bd87-2764b5f8b8d6",
        {
          username: username,
          score: score,
        },
        { headers: { Accept: "application/json" } }
      )
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
    console.log("Form response", response);
  };
  useEffect(() => {
    handleAnswerOptionClick();
    //eslint-disable-next-line
  });

  return (
    <>
      <div className="container exam_page my-3">
        <div className="row">
          <form className=" my-3">
            {showCertificate ? (
              <>
                <div className="d-flex align-items-center justify-content-center">
                  <ScoreCard score={score} />
                  {/* <Certificate
                    ref={componentRef}
                    // score={score}
                  /> */}
                </div>

                {/* <div className="d-flex flex-row justify-content-center my-4">
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
                </div> */}
              </>
            ) : (
              <>
                <div className="quiz_form">
                  {Questions &&
                    Questions.map((ques, index) => {
                      return (
                        <div key={index}>
                          <div className="fs-5 mt-3">
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
