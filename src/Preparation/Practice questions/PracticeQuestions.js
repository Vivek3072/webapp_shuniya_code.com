import React from "react";
import "./PracticeQestions.css";
import { Link } from "react-router-dom";

const PracticeQuestions = () => {
  return (
    <div>
      <div className="main container">
        <div className="heading_section">
          <h1 className="title">Practice questions for class 7</h1>
          <div className="desc">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa
            doloribus iste molestiae. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Reprehenderit accusamus esse voluptatibus aut, non
            maxime iure, facere, veniam hic qui atque.
          </div>
        </div>
        <hr />
        <div className="questions_section">
          <div className="questions_outer_box">
            <div className="questions_box">
              <div className="topic_box">
                <div className="topic_box_inner">
                  <h1 className="topic_title">Arrays</h1>
                  <div className="questions">
                    <Link to="#">
                      <Link to={`/challenge/id/limit`}>
                        <div className="question">
                          <span className="no">1.</span> This is the question
                        </div>
                      </Link>
                    </Link>
                    <div className="question">
                      <span className="no">2.</span>This is the question and it
                      can cover multiple lines.
                    </div>
                    <div className="question">
                      <span className="no">3.</span>This is the question
                    </div>
                    <div className="question">
                      <span className="no">4.</span>This is the question
                    </div>
                  </div>
                </div>
              </div>
              {/* // dummy  */}
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Strings</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>{" "}
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Linked List</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Recursion</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Tree</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
              <div className="topic_box">
                <div className="topic_box_inner">
                  <div className="topic_title">Arrays</div>
                  <div className="questions">
                    <div className="question">This is the question</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeQuestions;
