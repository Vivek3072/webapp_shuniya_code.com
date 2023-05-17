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
  //console.log(resize.current, mainM.current);

  // dragging logic starts here
  // var resizer = resize.current,
  //   sidebar = menu.current,
  //   mainMenu = mainM.current,
  //   editorDiv = editor.current;

  useEffect(() => {
    var resizer = resize.current,
      sidebar = menu.current,
      mainMenu = mainM.current,
      editorDiv = editor.current;
  }, []);

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
        console.log(iWidth, mainMenu.style.width);
      }
    }

    function rs_mouseupHandler() {
      // remove event mousemove && mouseup
      document.body.removeEventListener("mouseup", rs_mouseupHandler);
      document.body.removeEventListener("mousemove", rs_mousemoveHandler);
    }
    console.log(resizer);
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

  // dragging logic ends here

  const { questionCode } = useParams();
  // console.log("questionCode", questionCode);
  // ###### Window resize code starts

  const [size, setSize] = useState({
    x: 400,
    y: 200,
    z: window.innerWidth - 400,
  });

  const handler = (mouseDownEvent) => {
    console.log("clicked");
    const startSize = size;
    const startPosition = {
      x: mouseDownEvent.pageX,
      z: mouseDownEvent.pageX,
    };
    console.log(window.innerWidth - startPosition.x);

    function onMouseMove(mouseMoveEvent) {
      setSize((currentSize) => ({
        x: startSize.x - startPosition.x + mouseMoveEvent.pageX,
        z: window.innerWidth - size.x,
      }));
    }
    function onMouseUp() {
      document.body.removeEventListener("mousemove", onMouseMove);
      // uncomment the following line if not using `{ once: true }`
      // document.body.removeEventListener("mouseup", onMouseUp);
      //size.z = window.innerWidth - size.x - 100;
    }

    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
    size.z = window.innerWidth - size.x;
    console.log(size.z);
  };

  // ###### Window resize code ends

  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  // function to get question details with parameters
  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://43.204.229.206:8000/api/v1/programmingAssignment/1/`
      );
      // console.log(response.data.assignments);
      const arrayFile = await response.data.assignments;
      setItems(response.data.assignments);
      setTimeout(() => {
        // console.log("items", items);
      }, 500);

      if (items !== []) {
        const item = items.filter((item) => {
          //console.log(item.ques_id, parseInt(questionCode));
          if (item.ques_id == parseInt(questionCode)) {
            return item.ques_id == parseInt(questionCode);
          }
        });
        // console.log(item);
        setFilteredItem(item);
      }
      // console.log(filteredItem);
    } catch (error) {
      // Handle error
      alert(error.message, "Please try again");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  return (
    <div className="challenge_section">
      <div
        className="question_statement"
        style={{ width: size.x + "px" }}
        ref={menu}
      >
        <div className="statement_wrapper">
          {/* {filteredItem.map((item, index) => { */}
          {/* return ( */}
          <>
            <div className="left_panel">
              <div className="left_panel_wrapper">
                <div className="headings">
                  <h4>Problem:</h4>
                  <p>
                    {/* Binary search implementation using the appropriate method. */}
                    Item description
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
                  <p>
                    Here, all the input format defined.Here, all the input
                    format defined. Here, all the input format defined. Here,
                    all the input format defined.
                  </p>
                </div>
              </div>
            </div>
            <div className="right_panel">
              <div className="right_panel_wrapper">
                <div className="output_format">
                  <h4>Output format</h4>
                  <p>Here, all the input format defined.Here, all</p>
                </div>
                <hr />
                <div className="sample_input">
                  <div className="sample_input_title">Sample Input 1</div>
                  <div className="sample_input_output">output</div>
                  <div className="sample_input_explanation">
                    <h4>Explanation</h4>
                    <p>This is explanation</p>
                  </div>
                  <hr />
                  {/* ################ dummy data start  */}
                  <div className="sample_input_title">Sample Input 1</div>
                  <div className="sample_input_output">output</div>
                  <div className="sample_input_explanation">
                    <h4>Explanation</h4>
                  </div>
                  <div className="sample_input_title">Sample Input 1</div>
                  <div className="sample_input_output">output</div>
                  <div className="sample_input_explanation">
                    <h4>Explanation</h4>
                  </div>
                  {/* ################ dummy data end */}
                </div>
              </div>
            </div>
          </>
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
        {/* <Editor /> */}

        <RunnerEditor size={size.z} editor={editor} />
      </div>
      <div className="Evaluation"></div>
    </div>
  );
};

export default CodeRunner;
