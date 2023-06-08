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
  const language = useSelector((state) => state.language);

  const { questionCode, limit } = useParams();
  // states

  const [filteredItem, setFilteredItem] = useState({});

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
        await fetch(
          `http://43.204.229.206:8000/api/v1/programming-questions/1/1/${limit}/`
        )
          .then((response) => response.json())
          .then((data) => {
            // setItems(data);
            console.log("data", data.question_selected);
            const individualQuestion = data.question_selected.filter((item) => {
              console.log(item.programming_ques_id, questionCode);
              return item.programming_ques_id == questionCode;
            });
            console.log("question", individualQuestion);
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
          {/* {filteredfilteredItem.map((item, index) => {
            return ( */}
          <div>
            <div className="left_panel">
              <div className="left_panel_wrapper">
                <div className="headings">
                  <h4>{language === "ENG" ? "Problem" : "प्रश्न"}</h4>
                  <hr style={{ marginBottom: "20px" }} />
                  <h6>
                    {language === "ENG"
                      ? filteredItem[0]?.title
                      : filteredItem[0]?.title_hi}
                  </h6>
                  <p>
                    {language === "ENG"
                      ? filteredItem[0]?.description
                      : filteredItem[0]?.description_hi}
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
                  <h4>
                    {language === "ENG" ? "Input format" : "इनपुट फार्मेट"}
                  </h4>
                  <p>
                    {}
                    {language === "ENG"
                      ? filteredItem[0]?.input_format
                      : filteredItem[0]?.input_format_hi}
                  </p>
                </div>
              </div>
            </div>
            <div className="right_panel">
              <div className="right_panel_wrapper">
                <div className="output_format">
                  <h4>
                    {language === "ENG" ? "Output format" : "आउटपुट फार्मेट"}
                  </h4>
                  <p>
                    {language === "ENG"
                      ? filteredItem[0]?.output_format
                      : filteredItem[0]?.output_format_hi}
                  </p>
                </div>
                <hr />
                <div className="sample_input">
                  <div>
                    <div className="sample_input_title">
                      {language === "ENG" ? "Sample Input" : "सैम्पल इनपुट"}
                    </div>
                    <div className="sample_input_output">
                      {filteredItem[0]?.sample_input}
                    </div>
                    <div
                      className="sample_input_title sample_output_title"
                      style={{ marginTop: "20px" }}
                    >
                      {language === "ENG" ? "Sample output" : "सैम्पल आउटपुट"}
                    </div>
                    <div className="sample_input_output sample_output_output">
                      {filteredItem[0]?.sample_output}
                    </div>
                    <div className="sample_input_explanation mt-4">
                      <h4>{language === "ENG" ? "Explanation" : "व्याख्या"}</h4>
                      <p>
                        {language === "ENG"
                          ? filteredItem[0]?.explanation
                          : filteredItem[0]?.explanation_hi
                          ? filteredItem[0]?.explanation_hi
                          : filteredItem[0]?.explanation}
                      </p>
                    </div>
                    <hr />
                  </div>
                </div>
                {/* // constraints section  */}
                <div className="constraints">
                  <div className="inputConstraints">
                    {language === "ENG"
                      ? "Input Constraints"
                      : "इनपुट प्रतिबंध"}
                    <div className="constVal" style={{ fontWeight: "normal" }}>
                      {language === "ENG"
                        ? filteredItem[0]?.input_constrains
                        : filteredItem[0]?.input_constrains_hi}
                    </div>
                  </div>
                  <div className="outputConstraints">
                    {language === "ENG"
                      ? "Output Constraints"
                      : "आउटपुट प्रतिबंध"}
                    <div className="constVal" style={{ fontWeight: "normal" }}>
                      {language === "ENG"
                        ? filteredItem[0]?.output_constrains
                        : filteredItem[0]?.output_constrains_hi}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </div> */}
          </div>
          {/* );
          })} */}
        </div>
      </div>
      <div className="codeRunner" style={{ width: size.z + "px" }} ref={mainM}>
        <button
          ref={resize}
          id="draghandle"
          type="button"
          //  onMouseDown={handler}
        ></button>

        <RunnerEditor
          size={size.z}
          editor={editor}
          ques_id={questionCode}
          scoreInc={scoreInc}
          language={language}
        />
      </div>
      <div className="Evaluation"></div>
    </div>
  );
};

export default CodeRunner;
