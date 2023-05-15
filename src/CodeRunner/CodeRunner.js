import React, { useState, useEffect } from "react";
import "./codeRunner.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import Editor from "../Editor/Editor";
import RunnerEditor from "./Editor/RunnerEditor";

const CodeRunner = () => {
  const { questionCode } = useParams();
  console.log("questionCode", questionCode);

  const [items, setItems] = useState([]);
  const [filteredItem, setFilteredItem] = useState([]);
  // function to get question details with parameters
  const fetchItem = async () => {
    try {
      const response = await axios.get(
        `http://43.204.229.206:8000/api/v1/programmingAssignment/1/`
      );
      console.log(response.data.assignments);
      const arrayFile = await response.data.assignments;
      setItems(response.data.assignments);
      setTimeout(() => {
        console.log("items", items);
      }, 500);

      if (items !== []) {
        const item = items.filter((item) => {
          console.log(item.ques_id, parseInt(questionCode));
          if (item.ques_id == parseInt(questionCode)) {
            return item.ques_id == parseInt(questionCode);
          }
        });
        console.log(item);
        setFilteredItem(item);
      }
      console.log(filteredItem);
    } catch (error) {
      // Handle error
      alert(error.message, "Please try again");
    }
  };

  useEffect(() => {
    fetchItem();
  }, []);

  // if (!item) {
  //   return <div>Loading...</div>;
  // }
  return (
    <div className="challenge_section">
      <div className="question_statement">
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
      <div className="codeRunner">
        {/* <Editor /> */}

        <RunnerEditor />
      </div>
      <div className="Evaluation"></div>
    </div>
  );
};

export default CodeRunner;
