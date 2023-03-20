import { Link } from "react-router-dom";
import {
  FaJava,
  FaPython,
  FaHtml5,
  FaCss3,
  FaAngular,
  FaAws,
} from "react-icons/fa";
import "./Courses.css";

export default function Courses() {
  return (
    <>
      <div className="all_courses container my-2 d-flex align-items-center justify-content-center flex-wrap ">
        <Link to="/courses/python">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaPython /> Python
          </div>
        </Link>
        <Link to="/courses/java">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaJava /> Java
          </div>
        </Link>
        <Link to="/courses/html5">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaHtml5 /> HTML5
          </div>
        </Link>
        <Link to="/courses/css3">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaCss3 /> CSS3
          </div>
        </Link>
        <Link to="/courses/angular">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaAngular /> Angular
          </div>
        </Link>
        <Link to="/courses/aws">
          <div className="  border  d-flex align-items-center justify-content-center m-2 flex-column p-3 shadow-sm rounded fs-3">
            <FaAws /> AWS
          </div>
        </Link>
      </div>
    </>
  );
}
