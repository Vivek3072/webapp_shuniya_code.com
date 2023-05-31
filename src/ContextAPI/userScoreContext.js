import React, { createContext, useState } from "react";

export const userScoreContext = createContext();

export function ScoreFunctionProvider({ children }) {
  const [user, setUser] = useState({});
  const [userScore, setUserScore] = useState(
    parseInt(localStorage.getItem("userScore")) || 0
  );

  // fetch the logged in user
  // var userData = {
  //   name: "Sahil",
  //   score: 500,
  //   questions_solved: [1, 4, 5],
  // };
  // async function getData() {
  //   const token = localStorage.getItem("Authorization");
  //   console.log("token: " + token);
  //   if (token) {
  //     const response = await fetch("http://43.204.229.206:8000/api/v1/user", {
  //       method: "GET",
  //       headers: {
  //         Authorization: token,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((response) => {
  //         console.log("response of user data is ", response);
  //         // setUser(response);
  //       })
  //       .catch((err) => console.error(err));
  //   }
  // }
  // getData();

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
