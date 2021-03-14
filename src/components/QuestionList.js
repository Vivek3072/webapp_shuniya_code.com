import React,{useEffect, useState} from 'react';
import axios from 'axios';

const  QuestionList = (props) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const sectionList = ['इनपुट', 'पश्य', 'लिस्ट']
  const [section, setSection ] = useState('इनपुट');

  useEffect (() => {
    async function fetchData() {
      setIsLoading(true);
      const result = await axios('http://xn--11by0j.com:8000/api/v1/question_sectionwise/')
      setData(result.data)
      const contentData = result.data.filter((data) => data.section === section)
      setIsLoading(false);
    }
    fetchData()
  },[])
  
  return (
      <div>
        {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div className="border rounded">
          <ul className="nav nav-tabs nav-fill">
          {sectionList.map((tag) => {
            const active = tag === section? true: false;
            return (
              <li className="nav-item fw-bold" key={tag}>
                <button className={active? "btn-dark rounded fw-bold" : "btn rounded fw-bold" } onClick={(e) => setSection(e.target.value)} value={tag} aria-current="page" >{tag}</button>
              </li> 
            )
          })}

          </ul>
          
          {data.filter(data => data.section === section)
          .map((question) => {
            const decodedCode = decodeURIComponent(escape(window.atob(question.code)))
            return (
              <div key={question.question_statement} className="list-group-item d-flex justify-content-between align-items-center">
                    <p className="list-item">{ question.question_statement}</p>
                    <button className="btn-dark rounded" value={decodedCode} onClick={props.handleCopy}>Code</button>
              </div>
            )
          })}
        </div>
      )}
      </div>
    )
}
export default QuestionList;
