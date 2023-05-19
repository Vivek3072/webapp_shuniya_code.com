import React, { useState } from "react";
import "./runnerEditor.css";

const RunnerEditorOutput = ({ data }) => {
  const [datas, setDatas] = useState(data);
  console.log("data is here: ", data);
  return (
    <div>
      <div className="output_window">
        <div className="test_cases">
          {datas.map((item, i) => {
            console.log("item data is", item);
            return (
              <div key={i}>
                <div className="test_case1">
                  Test Case {item.test_cases_result[0].id}:
                  <span> {item.test_cases_result[0].result}</span>
                  {/* // input box  */}
                  <div className="inputCase">
                    <span className="resultkey">Input:</span>

                    <span className="inputVal">
                      {item.test_cases_result[0].input}
                    </span>
                  </div>
                  {/* // actual and Expected output box  */}
                  <div className="actualCase">
                    <span className="resultkey">Expected Output:</span>

                    <span className="resultVal">
                      {item.test_cases_result[0].expected_output}
                    </span>
                  </div>
                  {/* // User code output val  */}
                  <div className="userCase">
                    <span className="resultkey">Your Output: </span>
                    <span
                      className={`resultVal ${
                        item.test_cases_result[0].expected_output ===
                        item.test_cases_result[0].user_output
                          ? "correct"
                          : "inCorrect"
                      }`}
                    >
                      {item.test_cases_result[0].user_output}
                    </span>
                  </div>
                </div>
                <hr style={{ marginTop: "10px" }} />
                {/* <div className="test_case2">
                  Test Case 2:<span> fail</span>
                  <div className="inputCase">
                    <span className="resultkey">Input:</span>

                    <span className="inputVal">1 4 5</span>
                  </div>
                  <div className="actualCase">
                    <span className="resultkey">Expected Output:</span>

                    <span className="resultVal">25</span>
                  </div>
                  <div className="userCase">
                    <span className="resultkey">Your Output: </span>
                    <span
                      className={`resultVal ${
                        35 == 43 ? "correct" : "inCorrect"
                      }`}
                    >
                      24
                    </span>
                  </div>
                </div> */}
                <hr style={{ marginTop: "10px" }} />
              </div>
            );
          })}
          <div className="final_result">
            Overall Result :
            <span>
              {datas.overall_result}
              {/* {item.overall_result === "Passed" ? (
                <i className="fa-solid fa-circle-check"></i>
              ) : (
                <i className="fa-solid fa-circle-xmark"></i>
              )} */}

              {/* <i className="fa-solid fa-circle-check"></i> */}
              {/* <i className="fa-solid fa-circle-xmark"></i> */}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RunnerEditorOutput;
