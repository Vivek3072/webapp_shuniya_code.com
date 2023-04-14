import { Link } from "react-router-dom";
import CoursesData from "./Courses.json";
import { FaStar } from "react-icons/fa";
import "./Courses.css";

export default function Courses() {
  return (
    <>
      <div className="all_courses container my-4 d-flex align-items-center justify-content-center flex-wrap ">
        {CoursesData &&
          CoursesData.map((data, index) => {
            return (
              <Link to={`/courses/${data.course_name}`} key={data.week_id}>
                <div className="d-flex flex-column rounded shadow-sm p-1">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      className="rounded"
                      src={data.course_thumbnail}
                      alt="course"
                      style={{width:"300px" , height:"200px"}}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-between">
                    <span className="fs-4"> {data.course_name} </span>
                    <span className="fs-6 mx-1 text-warning d-flex flex-row align-items-center">
                      <span>{data.course_rating}</span>
                      <span className="p-1">
                        <FaStar />
                      </span>
                    </span>
                  </div>
                  <div> Price : Rs {data.course_price} </div>
                  <div>
                    Instructors :
                    {data.course_instructor.map((instructor, index) => {
                      return (
                        <span
                          key={instructor.course_instructor_id}
                          className="mx-1"
                        >
                          {instructor.course_instructor_name},
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })}
      </div>
    </>
  );
}
