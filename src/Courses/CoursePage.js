import { useState } from "react";
import { Link } from "react-router-dom";
import CourseContent from "./CourseContent";
import CourseStructure from "./CourseStructure";
import Discussions from "./Discussions";

export default function CoursePage() {
  const [video, setVideo] = useState(
    "https://drive.google.com/uc?export=download&id=1ojjs0E86zqo3l9C844fTfNT6oB-oOh4E"
  );
  const [title, setTitle] = useState("Chapter 1 , Topic 01");

  const [tab, setTab] = useState("course");
  return (
    <>
      <div className="container-fluid course_page mt-3">
        <div className="col-lg-4 col-md-12 col-sm-6 course_videos container d-flex flex-column justify-content-center my-2">
          <div className="d-flex flex-row align-items-center ">
            <div role="button" onClick={()=>setTab("course")} className={tab==="course"?"text-primary border border-primary rounded px-2 py-2 m-1":"text-secondary border rounded px-2 py-2 m-1"}>Course Structure</div>
            <div role="button" onClick={()=>setTab("discuss")} className={tab==="discuss"?"text-primary border border-primary rounded px-2 py-2 m-1":"text-secondary border rounded px-2 py-2 m-1"}>Discussions</div>
            <Link to="/courses/python/exam">
            <button className="btn btn-primary m-1">
              Get Certified &rarr;
            </button>
          </Link>
          </div>
          {tab === "course" && (
            <>
            <CourseStructure setVideo={setVideo} setTitle={setTitle}/>

            </>
          )}
          {tab === "discuss" && (
            <>
              <Discussions />
            </>
          )}

        </div>

        <div className="video_container col-lg-8 col-md-12 col-sm-6 p-3 shadow-sm rounded">
          <CourseContent  video={video} title={title}/>
        </div>
      </div>
    </>
  );
}
