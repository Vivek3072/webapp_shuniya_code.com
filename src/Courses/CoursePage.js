import { useEffect, useState } from "react";
import CourseContent from "./CourseContent";
import CourseStructure from "./CourseStructure";
import Discussions from "./Discussions";
import JavaData from "./JavaData.json";
import PythonData from "./PythonData.json";
import { useParams } from "react-router-dom";

export default function CoursePage() {
  const courseId = useParams();
  let coursePageData;
  if (courseId.course_id === "Java") coursePageData = JavaData;
  else if (courseId.course_id === "python") coursePageData = PythonData;
  
  const [video, setVideo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("Content");

  const [tab, setTab] = useState("course");
  useEffect(() => {
    setVideo(video);
  }, [video]);
  return (
    <>
      <div className="container-fluid course_page mt-3">
        <div className="col-lg-4 col-md-12 col-sm-6 course_videos container d-flex flex-column justify-content-center my-2">
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
              <CourseStructure
                courseData={coursePageData}
                setVideo={setVideo}
                setTitle={setTitle}
                setContent={setContent}
              />
            </>
          )}
          {tab === "discuss" && (
            <>
              <Discussions />
            </>
          )}
        </div>

        <div className="video_container col-lg-8 col-md-12 col-sm-6 p-3 shadow-sm rounded">
          <CourseContent
            courseData={JavaData}
            content={content}
            video={video}
            title={title}
          />
        </div>
      </div>
    </>
  );
}
