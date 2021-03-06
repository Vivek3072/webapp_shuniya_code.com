import React,{useEffect, useState} from 'react';
import { jsonData } from './../code_data/data1';
import axios from 'axios';

const  QuestionList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [section, setSection ] = useState([]);

  useEffect (() => {
    async function fetchData() {
      setIsLoading(true);
      const result = await axios('http://xn--11by0j.com:8000/api/v1/question_sectionwise/')
      setData(result.data)
      setIsLoading(false);
    }
    fetchData()
  },[])
  
  return (
      <div>
        {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <ul>
         
          {data.map((question) => {
            const decodedCode = decodeURIComponent(escape(window.atob(question.code)))
            return (
              <div key={question.question_statement} className="list-group-item d-flex justify-content-between align-items-center">
                    <p className="list-item">{ question.question_statement}</p>
                    <div >{question.section}</div>
                    <button className="btn-primary" value={decodedCode} onClick={props.handleCopy}>Code</button>
              </div>
            )
          })}
        </ul>
      )}
      </div>
    )
}
export default QuestionList;
