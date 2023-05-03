import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import "./Courses.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

export default function Courses() {
  const [loading, setLoading] = useState(true);
  const [ourData, setData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      "http://43.204.229.206:8000/api/v1/courses/?format=json"
    );
    setData(response.data);
    setLoading(false);
  };
  useEffect(() => {
    getData();
    //eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="all_courses container my-4 d-flex align-items-center justify-content-center flex-wrap rounded">
        {ourData.length > 0 && !loading ? (
          ourData.map((data) => {
            return (
              <Link to={`/course/${data.course_id}`} key={data.week_id}>
                <div className="d-flex flex-column rounded shadow-sm  px-1 overflow-hidden">
                  <div className="d-flex justify-content-center align-items-center">
                    <img
                      // className="rounded"
                      src={data.course_thumbnail}
                      alt="course"
                      style={{ width: "100%", height: "200px" }}
                    />
                  </div>

                  <div className="d-flex flex-row align-items-center justify-content-between px-2">
                    <span className="fs-4">
                      {data.course_name &&
                        data.course_name
                          .toLowerCase()
                          .split(" ")
                          .reduce(
                            (s, c) =>
                              s +
                              (c.charAt(0).toUpperCase() + c.slice(1) + " "),
                            ""
                          )}
                    </span>
                    <span className="fs-6 mx-1 text-warning d-flex flex-row align-items-center">
                      <span>{data.course_rating}</span>
                      <span className="p-1">
                        <FaStar />
                      </span>
                    </span>
                  </div>
                  <div className="px-2"> Price : Rs {data.course_price} </div>
                  <div className="px-2">
                    Instructors :
                    {data.course_instructor.map((instructor, index) => {
                      return (
                        <span key={index} className="mx-1">
                          {instructor.course_instructor_name},
                        </span>
                      );
                    })}
                  </div>
                </div>
              </Link>
            );
          })
        ) : (
          <h2> Loading all courses... </h2>
        )}
      </div>
    </>
  );
}
