import React, { useState, useEffect, useRef } from "react";
import "./codeRunner.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Editor from "../Editor/Editor";
import RunnerEditor from "./Editor/RunnerEditor";
import "./data";

const CodeRunner = () => {
  const resize = useRef();
  const menu = useRef(null);
  const mainM = useRef(null);
  const editor = useRef(null);

  const { questionCode } = useParams();
  // states
  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);

  // ###### Window resize code starts
  function InitResizerFn(resizer, sidebar, mainMenu, editorDiv) {
    // track current mouse position in x var
    var x, w;

    function rs_mousedownHandler(e) {
      x = e.clientX;

      var sbWidth = window.getComputedStyle(sidebar).width;
      w = parseInt(sbWidth, 10);

      document.body.addEventListener("mousemove", rs_mousemoveHandler);
      document.body.addEventListener("mouseup", rs_mouseupHandler);
    }

    function rs_mousemoveHandler(e) {
      var dx = e.clientX - x;

      var cw = w + dx; // complete width
      var iWidth = window.innerWidth;
      if (cw < 600) {
        sidebar.style.width = `${cw}px`;
        mainMenu.style.width = iWidth - `${cw}` + "px";
        editorDiv.style.width = iWidth - `${cw}` + "px";
        // console.log(iWidth, mainMenu.style.width);
      }
    }

    function rs_mouseupHandler() {
      // remove event mousemove && mouseup
      document.body.removeEventListener("mouseup", rs_mouseupHandler);
      document.body.removeEventListener("mousemove", rs_mousemoveHandler);
    }
    //console.log(resizer);
    setTimeout(() => {
      resizer.addEventListener("mousedown", rs_mousedownHandler);
    }, 500);
  }

  useEffect(() => {
    var resizer = resize.current,
      sidebar = menu.current,
      mainMenu = mainM.current,
      editorDiv = editor.current;
    setTimeout(
      () => InitResizerFn(resizer, sidebar, mainMenu, editorDiv),
      1000
    );
  }, []);

  // console.log("questionCode", questionCode);

  const [size, setSize] = useState({
    x: 400,
    y: 200,
    z: window.innerWidth - 400,
  });

  // ###### Window resize code ends

  // function to get question details with parameters
  useEffect(() => {
    const fetchItem = async () => {
      try {
        fetch(`http://43.204.229.206:8000/api/v1/programmingAssignment/1/`)
          .then((response) => response.json())
          .then((data) => {
            setItems(data.assignments);
            console.log(data.assignments);
            const item = data.assignments.filter((item) => {
              //console.log(item);
              return item.ques_id === parseInt(questionCode);
            });
            setFilteredItem(item);
          });

        setTimeout(() => {
          //console.log("items", items);
          //console.log("filtered item", filteredItem);
        }, 500);
      } catch (error) {
        // Handle error
        alert(error.message, "Please try again");
      }
    };

    fetchItem();
  }, []);
  if (!filteredItem) {
    return <div className="loading">Loading</div>;
  }

  return (
    <div className="challenge_section">
      <div
        className="question_statement"
        style={{ width: size.x + "px" }}
        ref={menu}
      >
        <div className="statement_wrapper">
          {filteredItem.map((item, index) => {
            return (
              <>
                <div className="left_panel" key={index}>
                  <div className="left_panel_wrapper">
                    <div className="headings">
                      <h4>Problem:</h4>
                      <hr style={{ marginBottom: "20px" }} />
                      <h6>{item.title}</h6>
                      <p>
                        {/* Binary search implementation using the appropriate method. */}
                        :- {item.description}
                      </p>
                    </div>
                    <hr />
                    <div className="task">
                      <h4>Task</h4>
                      <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                        <li>Task 4</li>
                      </ul>
                    </div>
                    <hr />
                    <div className="input_format">
                      <h4>Input format</h4>
                      <p>{item.test_cases[1].input_format}</p>
                    </div>
                  </div>
                </div>
                <div className="right_panel">
                  <div className="right_panel_wrapper">
                    <div className="output_format">
                      <h4>Output format</h4>
                      <p>{item.test_cases[1].output_format}</p>
                    </div>
                    <hr />
                    <div className="sample_input">
                      {/* // test cases sample data section  */}
                      {item.test_cases.map((testCase, i) => {
                        return (
                          <div key={i}>
                            <div className="sample_input_title">
                              Sample Input {testCase.test_case_id}
                            </div>
                            <div className="sample_input_output">
                              {testCase.sample_input}
                            </div>
                            <div
                              className="sample_input_title sample_output_title"
                              style={{ marginTop: "20px" }}
                            >
                              Sample output {testCase.test_case_id}
                            </div>
                            <div className="sample_input_output sample_output_output">
                              {testCase.sample_output}
                            </div>
                            <div className="sample_input_explanation">
                              <h4>Explanation</h4>
                              <p>{testCase.explanation}</p>
                            </div>
                            <hr />
                          </div>
                        );
                      })}
                    </div>
                    {/* // constraints section  */}
                    <div className="constraints">
                      <div className="inputConstraints">
                        Input Constraints
                        <div
                          className="constVal"
                          style={{ fontWeight: "normal" }}
                        >
                          {item.test_cases[1].input_constraints}
                        </div>
                      </div>
                      <div className="outputConstraints">
                        output Constraints
                        <div
                          className="constVal"
                          style={{ fontWeight: "normal" }}
                        >
                          {item.test_cases[1].output_constraints}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </>
            );
          })}
        </div>
      </div>
      <div className="codeRunner" style={{ width: size.z + "px" }} ref={mainM}>
        <button
          ref={resize}
          id="draghandle"
          type="button"
          //  onMouseDown={handler}
        ></button>
        {/* <Editor /> */}

        <RunnerEditor size={size.z} editor={editor} ques_id={questionCode} />
      </div>
      <div className="Evaluation"></div>
    </div>
  );
};

export default CodeRunner;
