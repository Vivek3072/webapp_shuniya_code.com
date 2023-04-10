import React, { useState ,useRef } from "react";
import { Link } from "react-router-dom";
import questions from "./Questions";
import { exportComponentAsJPEG } from 'react-component-export-image';
import Certificate from "../Certificate";
import { useParams } from "react-router-dom";

export default function Exam() {
  const componentRef = useRef();

  const courseId = useParams();
  let coursePageData;
  if (courseId.course_id === "Java/exam") coursePageData = "java";
  else if (courseId.course_id === "python/exam") coursePageData = "python";
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showCertificate, setShowCertificate] = useState(false);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(false);
  const [checked,setChecked]=useState(false);

  const handleAnswerOptionClick = (isCorrect) => {
    console.log(selectedOption, "selectedoption");
    if (isCorrect) {
      setScore(score + 1);
    }

    setChecked(false);
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowCertificate(true);
    }
  };

  return (
    <>
      <div className="container exam_page my-3">
        <div className="row">
          <form className="quiz_form my-3">
            {showCertificate ? (
              <>
              <div className="d-flex align-items-center justify-content-center">
                <Certificate ref={componentRef} score={score} coursePageData={coursePageData}/>
              </div>

                <div className="d-flex flex-row justify-content-center my-4">
                  <Link to="/courses">
                    <button className="btn btn-outline-primary mx-2">
                      Go to Course
                    </button>
                  </Link>
                    <button className="btn btn-primary mx-2" onClick={(e) =>{e.preventDefault(); exportComponentAsJPEG(componentRef)}}>
                      Download Certificate
                    </button>
                </div>
              </>
            ) : (
              <>
                <div className="question-section">
                  <div className="question-count text-center my-2">
                    <span>Question {currentQuestion + 1}</span>/
                    {questions.length}
                  </div>
                  <div className="question-text fs-5">
                    Q. {questions[currentQuestion].questionText}
                  </div>
                </div>
                <div className="answer-section">
                  {questions &&
                    questions[currentQuestion].answerOptions.map(
                      (option, index) => {
                        return (
                          <>
                            <div
                              className=""
                              key={index}
                              onClick={() =>
                                setSelectedOption(option.isCorrect)
                              }
                            >
                              <input
                                className="form-check-input"
                                type="radio"
                                name={currentQuestion}
                                id={option.answerText}
                                value={option.answerText}
                                checked={checked}
                                />
                              <label
                                htmlFor={option.answerText}
                                onClick={()=>{setChecked(!checked)}}
                                className="options d-flex flex-row"
                                key={index}
                              >
                                {option.answerText}
                              </label>
                            </div>
                          </>
                        );
                      }
                    )}
                  {currentQuestion + 1 === questions.length ? (
                    <button
                      className="btn btn-primary d-block ms-auto my-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAnswerOptionClick(selectedOption);
                      }}
                    >
                      {!showCertificate ? "Submit" : "Go Back"}{" "}
                    </button>
                  ) : (
                    <button
                      className="btn btn-primary d-block ms-auto my-3"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAnswerOptionClick(selectedOption);
                      }}
                    >
                      Next
                    </button>
                  )}
                </div>

              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}
