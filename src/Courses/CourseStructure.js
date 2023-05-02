import { useState } from "react";
import { RiArrowRightSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

export default function CourseStructure(props) {
  const [topicCompleteArray, setTopicCompleteArray] = useState(
    Array(10).fill(false)
  );

  const setTopicCompleteHandler = (topic_id) => {
    setTopicCompleteArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[topic_id] = true;
      return newArray;
    });
  };

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
                  ({course_module.duration_of_video} mins)
                </span>
              </div>
              {course_module.topics.map((topic, index) => {
                return (
                  <div key={index}>
                    <li
                      className={
                        topicCompleteArray[topic.topic_id]
                          ? "text-success topic_list"
                          : "topic_list"
                      }
                      onClick={() => {
                        setTopicCompleteHandler(topic.topic_id);
                        props.setVideo(topic.video_link);
                        props.setTitle((prev) => (prev = topic.topics_title));
                        props.setContent(topic.content);
                      }}
                    >
                      {topic.topic_id}. {topic.topics_title}
                    </li>
                  </div>
                );
              })}
              <Link to="/course/2/exam">
                <div className="text-info text-center rounded m-1 border border-info px-3 py-2">
                  Quiz Week {course_module.quiz_id} &rarr;
                </div>
              </Link>
              <br />
            </div>
          );
        })}
    </>
  );
}
