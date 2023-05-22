import React, { useState } from "react";
import "./runnerEditor.css";

const RunnerEditorOutput = ({ data }) => {
  const [datas] = useState(data);
  const [tabs, setTabs] = useState("test");
  console.log("data is here: ", data);

  const toggleTabs = () => {
    if (tabs === "test") {
      setTabs("submissions");
    } else {
      setTabs("test");
    }
    console.log(tabs);
  };

  return (
    <>
      {/* // tabs  */}
      <ul className="nav nav-tabs submissions">
        <li className="nav-item" onClick={toggleTabs}>
          <span
            className={`nav-link ${tabs === "test" ? " active" : ""}`}
            aria-current="page"
            href="#"
          >
            Test Cases
          </span>
        </li>
        <li className="nav-item" onClick={toggleTabs}>
          <span
            className={`nav-link ${tabs === "submissions" ? " active" : ""}`}
            href="#"
          >
            Submissions
          </span>
        </li>
      </ul>
      {/* // output window of test cases  */}
      <div>
        <div className="output_window">
          {tabs === "test" && (
            <div className="test_cases">
              {/* {datas.map((item, i) => {
            console.log("item data is", item);
            return ( */}
              <div>
                <div className="test_case1">
                  Test Case 1:
                  <span> Passed</span>
                  {/* // input box  */}
                  <div className="inputCase">
                    <span className="resultkey">Input:</span>

                    <span className="inputVal">2 3 4 5</span>
                  </div>
                  {/* // actual and Expected output box  */}
                  <div className="actualCase">
                    <span className="resultkey">Expected Output:</span>

                    <span className="resultVal">10</span>
                  </div>
                  {/* // User code output val  */}
                  <div className="userCase">
                    <span className="resultkey">Your Output: </span>
                    <span
                    // className={`resultVal ${
                    //   item.test_cases_result[0].expected_output ===
                    //   item.test_cases_result[0].user_output
                    //     ? "correct"
                    //     : "inCorrect"
                    // }`}
                    >
                      10
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
                <div className="output">kfefjoiewhfiewhfio</div>
                <hr style={{ marginTop: "10px" }} />
              </div>
              {/* );
          })} */}
              <div className="final_result">
                Overall Result :
                <span>
                  {/* {datas.overall_result} */}
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
          )}
          {tabs === "submissions" && (
            <div className="submissions">
              <div className="allSubmissions">
                {/* <div className="submission"></div> */}
                <div className="title">All Submissions</div>
                <div className="table-responsive">
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Submission Date</th>
                        <th scope="col">Language</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                      </tr>
                      <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>

                        <td>@fat55</td>
                      </tr>
                      <tr>
                        <th scope="row">3</th>
                        <td colSpan="2">Larry the Bird</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RunnerEditorOutput;
