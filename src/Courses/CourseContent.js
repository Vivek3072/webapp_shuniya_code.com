import React from "react";
// import CodeBox from "./editor/CodeBox";
import Laptop from "../../src/assets/Laptop.png";

export default function CourseContent(props) {
  const video = props.video;
  const title = props.title;
  const content = props.content;

  return (
    <>
      {video && title && content ? (
        <>
          <div className="d-flex flex-row justify-content-center">
            <iframe
              width="500"
              height="300"
              src={video}
              autoplay
              title={props.title}
              frameborder="0"
            ></iframe>
          </div>
          <br />
          <div className="fs-3">{props.title}</div>
          <div>{props.content}</div>
          {/* <CodeBox />*/}
        </>
      ) : (
        <>
          <div>
            <div className="d-flex flex-row justify-content-center align-items-center my-2 p-3">
            <img src={Laptop} alt="Laptop" style={{ width: "50px" }} />
            <div className="text-center mx-2 fs-3">Welcome to the course!</div>
            </div>

              
            <div className="text-center fs-6 my-1 p-2">
            This course is designed to teach you the fundamentals of programming, including the basic concepts, syntax, and structure . You will learn how to write code, debug errors, and create basic applications. Additionally, you will gain experience using various tools and resources commonly used in the industry, such as integrated development environments (IDEs), version control systems, and software development kits (SDKs). This course is ideal for beginners who are interested in learning how to code, as well as more experienced developers looking to refine their skills and stay up-to-date with the latest technologies and best practices. By the end of the course, you should have a solid foundation in coding and be able to tackle more advanced programming challenges with confidence.
            </div>
            <div className="text-center text-info fs-5">Complete the course to get certified!
            </div>
          </div>
        </>
      )}
    </>
  );
}
