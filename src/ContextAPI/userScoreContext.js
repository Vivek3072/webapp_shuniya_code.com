import React, { createContext, useState, useEffect } from "react";

export const userScoreContext = createContext();
// userContext for handling the state of user data globally in the project
export function ScoreFunctionProvider({ children }) {
  const [user, setUser] = useState({});
  const [userScore, setUserScore] = useState(0);

  useEffect(() => {
    const userLocalData = JSON.parse(localStorage.getItem("user_profile"));
    const userLocalScore = JSON.parse(localStorage.getItem("user_score"));
    setUser(userLocalData);
    setUserScore(userLocalScore);
  }, []);

  if (user) {
  }
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

  // const localScore = localStorage.getItem("userScore");
  // if (!localScore) {
  //   localStorage.setItem("userScore", 0);
  // } else {
  //   // const localScr = localStorage.getItem("userScore");
  //   // setUserScore(localScr);
  // }

  function scoreInc(plus) {
    //   console.log("plus value: " + plus);
    setUserScore(userScore + parseInt(plus));
    localStorage.setItem("userScore", userScore + parseInt(plus));
    //   console.log("userScore: " + userScore);
  }

  return (
    <userScoreContext.Provider
      value={{ userScore, setUserScore, user, setUser, scoreInc }}
    >
      {children}
    </userScoreContext.Provider>
  );
}
