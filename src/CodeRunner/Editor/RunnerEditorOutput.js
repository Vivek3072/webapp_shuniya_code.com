import React, { useState, useEffect } from "react";
import "./runnerEditor.css";
// import { set } from "immutable";
import { useContext } from "react";
import { userScoreContext } from "../../ContextAPI/userScoreContext";

const RunnerEditorOutput = ({ data, testCases, updatingUserScore }) => {
  // output value from the api of test cases
  const [datas] = useState(data);
  const [testCase, settestCase] = useState(testCases);
  const [overallresult, setoverallresult] = useState(null);

  const [tabs] = useState("test");
  // user context
  // const { user } = useContext(userScoreContext);
  // userId = user.id;
  // console.log("user is ", user.id);
  // if user not logged in its null.

  // var overallresult = null;
  setTimeout(() => {
    // Calling the update score function
    if (datas) {
      updatingUserScore(overallresult);
    }
  }, 2000);

  // function for switching between the tabs
  const toggleTabs = () => {
    // if (tabs === "test") {
    //   setTabs("submissions");
    // } else {
    //   setTabs("test");
    // }
    // console.log(tabs);
  };
  // var overall = "True";
  // console.log("datas", datas);

  useEffect(() => {
    let output = true;
    data.result.map((item, i) => {
      if (item.Passed == "False") {
        output = false;
      }
      // console.log("state output ", output);
    });
    setoverallresult(output);
  }, []);

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
        {/* // Submission tab  */}
        {/* <li className="nav-item" onClick={toggleTabs}>
          <span
            className={`nav-link ${tabs === "submissions" ? " active" : ""}`}
            href="#"
          >
            Submissions
          </span>
        </li> */}
      </ul>
      {/* // output window of test cases  */}
      <div>
        <div className="output_window">
          {tabs === "test" && (
            <div className="test_cases">
              <div>
                <div className="testCasesWrapper">
                  {datas &&
                    datas.result.map((item, i) => {
                      return (
                        <div style={{ padding: 0, margin: 0 }} key={i}>
                          <div className="test_case1">
                            Test Case {i + 1}:
                            <span>
                              {item.Passed == "False" ? "Failed" : "Passed"}
                            </span>
                            {/* // input box  */}
                            <div className="inputCase">
                              <span className="resultkey">Input:</span>

                              <span className="inputVal">
                                {testCase[i].test_case_input}
                              </span>
                            </div>
                            {/* // actual and Expected output box  */}
                            <div className="actualCase">
                              <span className="resultkey">
                                Expected Output:
                              </span>

                              <span className="resultVal">
                                {testCase[i].test_case_output}
                              </span>
                            </div>
                            {/* // User code output val  */}
                            {/* <div className="userCase">
                              <span className="resultkey">Your Output: </span>
                              <span
                                className={`resultVal ${
                                  testCase[i].test_case_output === item.Passed
                                    ? "correct"
                                    : "inCorrect"
                                }`}
                              >
                                {item.Passed}
                              </span>
                            </div> */}
                          </div>
                          <hr style={{ marginTop: "25px" }} />
                        </div>
                      );
                    })}
                </div>
              </div>

              <div
                className="final_result"
                style={{
                  background: overallresult ? "#c0fdc3" : "#fdc0c0",
                }}
              >
                Overall Result : <b>{overallresult ? "Passed" : "Failed"}</b>
                <span>
                  {/* {datas.overall_result} */}
                  {overallresult ? (
                    <i className="fa-solid fa-circle-check ml-2"></i>
                  ) : (
                    <i className="fa-solid fa-circle-xmark ml-2"></i>
                  )}
                  {/* <i className="fa-solid fa-circle-check"></i> */}
                  {/* <i cla  ssName="fa-solid fa-circle-xmark"></i> */}
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
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Submission Date</th>
                        <th scope="col">Language</th>
                        <th scope="col">Result</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>28/4/2023</td>
                        <td>Python(en)</td>
                        <td style={{ color: "#1a1" }}>Passed</td>
                      </tr>
                      {/* <hr /> */}
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
