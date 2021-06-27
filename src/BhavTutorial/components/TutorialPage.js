import React, { useState , useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import MainHindi from "./MainHindi";

function TutorialPage(props) {
  const [disable, setDisable] = useState(true);

  return (
    <div>
      <Header></Header>
      <button
        className="btn-dark rounded mb-4"
        style={{ height: "25px" }}
        onClick={() => setDisable(!disable)}
      >
        {disable ? "Hindi" : "English"}
      </button>
      <MainHindi tutorialLink={props.match.params.tutorialTitle}></MainHindi>
    </div>
  );
}

export default TutorialPage;
