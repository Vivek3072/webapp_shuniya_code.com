import React from "react";
import CodeBox from "./editor/CodeBox";

export default function CourseContent(props) {
  return (
    <>
      <video autoplay loop controls src={props.video}></video>
      <div className="tv_stand"></div>
      <br />
      <div className="fs-3">{props.title}</div>
      <div>
        Python is a widely used general-purpose, high level programming
        language. It was created by Guido van Rossum in 1991 and further
        developed by the Python Software Foundation. It was designed with an
        emphasis on code readability, and its syntax allows programmers to
        express their concepts in fewer lines of code. Python is a programming
        language that lets you work quickly and integrate systems more
        efficiently. There are two major Python versions: Python 2 and Python 3.
        Both are quite different.
      </div>
        <div className="fs-4 mt-3">1. Writing our first program:</div>
        <CodeBox />

        <div className="fs-4 mt-3">2. About the course</div>

      <div>
        A beginner-friendly course designed to help start learning
        Python language from scratch. Learn Python basics, Variables & Data
        types, Input & Output, Operators, and more as you build your python
        foundation real strong with us! A beginner-friendly course designed to
        help start learning Python language from scratch. Learn Python basics,
        Variables & Data types, Input & Output, Operators, and more as you build
        your python foundation real strong with us!
      </div>
    </>
  );
}
