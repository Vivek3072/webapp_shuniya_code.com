import React, { useState , useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import MainHindi from "./MainHindi";

function TutorialPage(props) {
  const [disable, setDisable] = useState(true);

  const clickHandle=(e)=>{
    e.preventDefault();
    setDisable(!disable);
  }

  return (
    <div>
      
      <button
        className="btn-dark rounded mb-4"
        style={{ height: "25px" }}
        onClick={clickHandle}
      >
        {disable ? "Hindi" : "English"}
      </button>
      {disable?
        <MainHindi disable={disable} tutorialLink={props.match.params.tutorialTitle}></MainHindi>:
        <Main disable={disable} tutorialLink={props.match.params.tutorialTitle}></Main>}
    </div>
  );
}

export default TutorialPage;
