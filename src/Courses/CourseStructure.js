import { RiArrowRightSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function CourseStructure(props) {
  return (
    <>
      <div className="mt-3"></div>
      {props.courseData &&
        props.courseData.map((course_module, index) => {
          return (
            <div key={index}>
              <div className="week_data_main fs-4 py-2">
                <RiArrowRightSFill /> Week 0{course_module.week_number}
                <span className="fs-6 text-secondary mx-1">
                  ({course_module.duration_of_video})
                </span>
              </div>
              {course_module.topics.map((topic, index) => {
                return (
                  <div key={index}>
                    <li
                      className="topic_list"
                      onClick={() => {
                        props.setVideo(topic.video_link);
                        props.setTitle((prev) => (prev = topic.topics_title));
                        props.setContent(topic.content);
                      }}
                    >
                      {index + 1}. {topic.topics_title}
                    </li>
                  </div>
                );
              })}
              <Link to="/courses/python/exam">
                <div className="text-primary ps-3 m-1">
                  Quiz Week {index + 1} &rarr;
                </div>
              </Link>
              <br />
            </div>
          );
        })}
    </>
  );
}
