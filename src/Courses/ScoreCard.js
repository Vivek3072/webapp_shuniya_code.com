import React from "react";
import { Link } from "react-router-dom";

export default function ScoreCard(props) {
  const username = localStorage.getItem("username");

  return (
    <>
      <div className="container d-flex flex-column">
        <div className="fs-1 text-center mt-4">
          Hello 👋 ,
          <span className="text-success"> {username && username} </span>
        </div>
        <div className="fs-3 text-center mb-4">
          Your score is : <span className="text-info fs-2">{props.score}</span> in Quiz 01
        </div>
        <div className="fs-3 text-center mb-4">
          Your global rank is : <span className="text-info fs-2">{props.globalRank}</span>
        </div>
        <br />
        <Link to="/" className="btn btn-primary">
          Go to Home
        </Link>
      </div>
    </>
  );
}
