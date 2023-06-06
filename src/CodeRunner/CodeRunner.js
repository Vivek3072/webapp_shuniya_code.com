import React, { useState, useEffect, useRef, useContext } from "react";
import "./codeRunner.css";
import { useParams } from "react-router-dom";
// import axios from "axios";
// import Editor from "../Editor/Editor";
import RunnerEditor from "./Editor/RunnerEditor";
// import "./data";
import { userScoreContext } from "../ContextAPI/userScoreContext";
import { useSelector } from "react-redux";

const CodeRunner = () => {
  const resize = useRef();
  const menu = useRef(null);
  const mainM = useRef(null);
  const editor = useRef(null);

  const { userScore, scoreInc } = useContext(userScoreContext);
  // language toggle state
  const language = useSelector((state) => state.language); // for getting the lang.

  const { questionCode, limit } = useParams();
  // states

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
    }, 100);
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

  const [size, setSize] = useState({
    x: 500,
    y: 200,
    z: window.innerWidth - 500,
  });

  // ###### Window resize code ends

  // Parameters values
  // console.log("questionCode", questionCode);
  // console.log("limit", limit);

  // function to get question details with parameters
  useEffect(() => {
    const fetchItem = async () => {
      try {
        fetch(
          `http://43.204.229.206:8000/api/v1/programming-questions/1/1/${limit}/`
        )
          .then((response) => response.json())
          .then((data) => {
            // setItems(data);
            // console.log("data", data.question_selected);
            const individualQuestion = data.question_selected.filter((item) => {
              return item.programming_ques_id == questionCode;
            });
            // console.log(individualQuestion);
            setFilteredItem(individualQuestion);
          });
      } catch (error) {
        // Handle error
        alert(error.message, "Please try again");
      }
    };

    fetchItem();
  }, []);
  if (!filteredItem) {
    return (
      <div className="loading">
        <b>Loading...</b>
      </div>
    );
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
              <div key={index}>
                <div className="left_panel">
                  <div className="left_panel_wrapper">
                    <div className="headings">
                      <h4>Problem</h4>
                      <hr style={{ marginBottom: "20px" }} />
                      <h6>{language === "ENG" ? item.title : item.title_hi}</h6>
                      <p>
                        {language === "ENG"
                          ? item.description
                          : item.description_hi}
                      </p>
                    </div>
                    <hr />
                    {/* // task box  */}
                    {/* <div className="task">
                      <h4>Task</h4>
                      <ul>
                        <li>Task 1</li>
                        <li>Task 2</li>
                        <li>Task 3</li>
                        <li>Task 4</li>
                      </ul>
                    </div> */}
                    {/* <hr /> */}
                    <div className="input_format">
                      <h4>Input format</h4>
                      <p>
                        {}
                        {language === "ENG"
                          ? item.input_format
                          : item.input_format_hi}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="right_panel">
                  <div className="right_panel_wrapper">
                    <div className="output_format">
                      <h4>Output format</h4>
                      <p>
                        {language === "ENG"
                          ? item.output_format
                          : item.output_format_hi}
                      </p>
                    </div>
                    <hr />
                    <div className="sample_input">
                      <div>
                        <div className="sample_input_title">Sample Input</div>
                        <div className="sample_input_output">
                          {item.sample_input}
                        </div>
                        <div
                          className="sample_input_title sample_output_title"
                          style={{ marginTop: "20px" }}
                        >
                          Sample output
                        </div>
                        <div className="sample_input_output sample_output_output">
                          {item.sample_output}
                        </div>
                        <div className="sample_input_explanation">
                          <h4>Explanation</h4>
                          <p>{item.explanation}</p>
                        </div>
                        <hr />
                      </div>
                    </div>
                    {/* // constraints section  */}
                    <div className="constraints">
                      <div className="inputConstraints">
                        Input Constraints
                        <div
                          className="constVal"
                          style={{ fontWeight: "normal" }}
                        >
                          {language === "ENG"
                            ? item.input_constrains
                            : item.input_constrains_hi}
                        </div>
                      </div>
                      <div className="outputConstraints">
                        output Constraints
                        <div
                          className="constVal"
                          style={{ fontWeight: "normal" }}
                        >
                          {language === "ENG"
                            ? item.output_constrains
                            : item.output_constrains_hi}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* </div> */}
              </div>
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

        <RunnerEditor
          size={size.z}
          editor={editor}
          ques_id={questionCode}
          scoreInc={scoreInc}
        />
      </div>
      <div className="Evaluation"></div>
    </div>
  );
};

export default CodeRunner;
