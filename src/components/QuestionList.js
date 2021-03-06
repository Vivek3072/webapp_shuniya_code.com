import React from 'react';
import { jsonData } from './../code_data/data1';

const  QuestionList = (props) => {
    console.log(props)
    return (
        jsonData.data.map((question) => {
            // const code = window.btoa(unescape(encodeURIComponent(question.code)))
            const decodedCode = decodeURIComponent(escape(window.atob(question.code_encoded)))
            return (
              <div key={question.question_no} className="list-group-item d-flex justify-content-between align-items-center">
                    <p>{question.question_no + ". " + question.question_statement}</p>
                    <button className="btn-primary" value={decodedCode} onClick={props.handleCopy}>Code</button>
              </div>
            )
          })
    )
}
export default QuestionList;
