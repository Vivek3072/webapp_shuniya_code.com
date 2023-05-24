import React, { createContext, useState } from "react";

export const userScoreContext = createContext();

export function ScoreFunctionProvider({ children }) {
  //   const [value, setValue] = useState(100);
  const [userScore, setUserScore] = useState(
    parseInt(localStorage.getItem("userScore")) || 0
  );

  // fetch the logged in user
  // var user = {
  //   id: 1,
  //   name: "Sahil",
  //   score: 500,
  //   questions_solved: [1, 4, 5],
  // };

  const localScore = localStorage.getItem("userScore");
  if (!localScore) {
    localStorage.setItem("userScore", 0);
  } else {
    // const localScr = localStorage.getItem("userScore");
    // setUserScore(localScr);
  }

  function scoreInc(plus) {
    //   console.log("plus value: " + plus);
    setUserScore(userScore + parseInt(plus));
    localStorage.setItem("userScore", userScore + parseInt(plus));
    //   console.log("userScore: " + userScore);
  }

  return (
    <userScoreContext.Provider value={{ userScore, setUserScore, scoreInc }}>
      {children}
    </userScoreContext.Provider>
  );
}
