import React, { useState, useEffect } from "react";
import Questions from "./Questions.json";
import "./Exam.css";
import axios from "axios";
import ScoreCard from "../ScoreCard";

export default function Quiz() {
  const [showCertificate, setShowCertificate] = useState(false);
  const [score, setScore] = useState(0);

  const [globalRank, setGlobalRank] = useState('');

  const handleAnswerOptionClick = (isCorrect) => {
    isCorrect && setScore(score + 1);
  };
  const handleSubmit = async () => {
    const response = await axios.post(
      "http://43.204.229.206:8000/api/v1/quiz/submit/",
      {
        quiz_id: 3,
        user_id: 2,
        score: score,
      },
      { headers: { "Content-Type": "application/json" } }
      );
      setGlobalRank(response.data.global_rank);
      setShowCertificate(true);
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
                  <ScoreCard score={score} globalRank={globalRank} />
                </div>
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
