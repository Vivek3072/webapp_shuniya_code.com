import React, { useState } from "react";
import Header from "./Header";
import Main from "./Main";

function TutorialPage(props) {
  return (
    <div>
      <Header></Header>
      <Main tutorialLink={props.match.params.tutorialTitle}></Main>
    </div>
  );
}

export default TutorialPage;
