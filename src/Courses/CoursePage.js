import { useEffect, useState } from "react";
import CourseContent from "./CourseContent";
import CourseStructure from "./CourseStructure";
import Discussions from "./Discussions";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

export default function CoursePage() {
  const history = useHistory();

  const { course_id, user_id } = useParams();
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [loading, setLoading] = useState(true);

  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Content");

  const [tab, setTab] = useState("course");

  const [courseData, setCourseData] = useState([]);

  const getData = async () => {
    const response = await axios.get(
      `http://43.204.229.206:8000/api/v1/course/${course_id}/${user_id}/?format=json`
    );
    setCourseData(response.data.data);
    setIsEnrolled(response.data.success);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    setVideo(video);
    if (!isEnrolled) {
       history.push(`/course/${course_id}/course_overview/`);
       return;
    }
  }, [video]);

  return (
    <>
        <div className="container-fluid course_page mt-3">
          <div className="order-2 order-sm-2 order-lg-1 col-lg-4 col-md-12 col-sm-6 course_videos container d-flex flex-column justify-content-center my-2">
            <div className="d-flex flex-row align-items-center ">
              <div
                role="button"
                onClick={() => setTab("course")}
                className={
                  tab === "course"
                    ? "text-primary border border-primary rounded px-2 py-2 m-1"
                    : "text-secondary border rounded px-2 py-2 m-1"
                }
              >
                Course Structure
              </div>
              <div
                role="button"
                onClick={() => setTab("discuss")}
                className={
                  tab === "discuss"
                    ? "text-primary border border-primary rounded px-2 py-2 m-1"
                    : "text-secondary border rounded px-2 py-2 m-1"
                }
              >
                Discussions
              </div>
            </div>
            {tab === "course" && (
              <>
                {courseData && !loading ? (
                  <CourseStructure
                    courseData={courseData}
                    setVideo={setVideo}
                    setTitle={setTitle}
                    setContent={setContent}
                  />
                ) : (
                  <div className="p-2"> Loading course module... </div>
                )}
              </>
            )}
            {tab === "discuss" && (
              <>
                <Discussions />
              </>
            )}
          </div>

          <div className="video_container order-1 order-sm-1 order-lg-2 col-lg-8 col-md-12 col-sm-6 p-3 shadow-sm rounded">
            <CourseContent
              courseData={courseData}
              content={content}
              video={video}
              title={title}
            />
          </div>
        </div>
    </>
  );
}
