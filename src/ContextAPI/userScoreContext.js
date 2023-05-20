import React, { createContext, useState } from "react";

export const userScoreContext = createContext();

export function ScoreFunctionProvider({ children }) {
  //   const [value, setValue] = useState(100);
  const [userScore, setUserScore] = useState(500);

  // fetch the logged in user
  var user = {
    id: 1,
    name: "Sahil",
    score: 500,
    questions_solved: [1, 4, 5],
  };
  function scoreInc(plus) {
    console.log("plus value: " + plus);
    setUserScore(userScore + plus);
    console.log("userScore: " + userScore);
  }

  return (
    <userScoreContext.Provider
      value={{ user, userScore, setUserScore, scoreInc }}
    >
      {children}
    </userScoreContext.Provider>
  );
}
