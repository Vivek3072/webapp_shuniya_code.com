import React, { useState, useEffect } from "react";
import "./preparation.css";
import { Link } from "react-router-dom";
import image from "./images/pentagon_bg.svg";
import axios from "axios";
const baseURL = "http://43.204.229.206:8000/api/v1/programmingAssignment/1/";

const Preparation = () => {
  const [questions, setQuestions] = useState([]);
  console.log(questions);
  const getQuestions = async () => {
    try {
      axios.get(baseURL).then((response) => {
        // console.log(response.data.assignments);
        const outputData = response.data.assignments;
        setQuestions(outputData);
      });
    } catch (error) {
      alert("Some error occurred. Please refresh the page");
    }
  };

  useEffect(() => {
    getQuestions();
  }, []);
  if (questions === []) return null;

  return (
    <>
      <div className="main">
        {/* // Header section  */}
        <div className="header">
          <div className="container">
            <div className="flex d-flex justify-content-between align-items-center content-header-wrapper">
              {/* // title section  */}
              <nav
                style={{ "--bs-breadcrumb-divider": ">" }}
                aria-label="breadcrumb"
              >
                <div className="headerName">
                  <ol className="ol breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">Home</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      Library
                    </li>
                  </ol>
                  <div className="page_label_wrapper">
                    <h1 className="page_label">Python</h1>
                  </div>
                </div>
              </nav>
              {/* // points section  */}
              <div className="community-header-aside">
                <div className="track-badge-progress">
                  <div className="badge-progress">
                    <div className="remaining">
                      <div className="point-left-wrap">
                        <span className="point-left">35 more points</span> to
                        get your first star!
                      </div>
                      <div className="track-progress-bar">
                        <div className="ui-progress-bar progress-bar theme-default">
                          <div
                            className="progress-filler"
                            style={{ width: "0%" }}
                          ></div>
                        </div>
                      </div>
                      <div className="score-info">
                        <span className="current-rank">
                          Rank: <span className="value">2565897</span>
                        </span>
                        <span className="pipe">|</span>
                        <span className="current-points">
                          Points: <span className="value">0/35</span>
                        </span>
                        <a
                          className="scoring-link"
                          data-analytics="BadgeLearnMoreLink"
                          data-attr1="python"
                          target="_blank"
                          href="/scoring"
                        >
                          <i className="fa-regular fa-circle-info"></i>
                        </a>
                      </div>
                    </div>
                    <div className="badge">
                      <div className="icon">
                        {/* <i className="fa-brands fa-python"></i> */}
                        <img src={image} alt="badge background" />
                      </div>
                      <div className="text">
                        <i className="fa-brands fa-python"></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* // Content section  */}
        <div className="container content_section">
          {/* // Left panel  */}
          <div className="practice_panel left-panel">
            {/* // recommended challenge for new user  */}
            <div className="recommended_challenge">
              <div className="single_item">
                <div className="track_contest">
                  <div className="content_body">
                    <div className="content_list_header">
                      <div className="challenge_name_details">
                        <div className="inline_block">
                          <h4 className="challenge_title">
                            Say "Hello, World!" With Python
                            <div className="card-details pmT">
                              <span className="difficulty easy detail-item">
                                Easy
                              </span>
                              <span className="max-score detail-item">
                                Max Score: 5
                              </span>
                              <span className="success-ratio detail-item">
                                Success Rate: 96.72%
                              </span>
                            </div>
                          </h4>
                        </div>
                      </div>
                    </div>
                    <div className="content_preview_box">
                      <div className="preview-content">
                        Get started with Python by printing to stdout.
                      </div>
                      <span className="bookmark-cta">
                        <button
                          className=" star-button"
                          aria-label="Add bookmark"
                        >
                          <div className="ui-content align-icon-right">
                            <span className="ui-text" aria-hidden="false">
                              <i className="fa-regular fa-star"></i>
                            </span>
                          </div>
                        </button>
                      </span>
                      <div className="cta-container">
                        <div className="ctas">
                          <div className="challenge-submit-btn">
                            <button className="ui-btn ui-btn-normal primary-cta ui-btn-primary ui-btn-styled">
                              <div className="ui-content align-icon-right">
                                <span className="ui-text" aria-hidden="false">
                                  Solve Challenge
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* // All challenges list  */}
            <div className="challenges-list">
              {questions !== [] &&
                questions.map((question, i) => {
                  return (
                    <div
                      className="single-item challenges-list-view-v2 first-challenge cursor"
                      key={i}
                    >
                      <div
                        id="contest-challenges-problem"
                        className="individual-challenge-card-v2 content--list-v2 track_content"
                      >
                        <div className="content--list_body">
                          <header className="content--list_header-v2">
                            <div className="challenge-name-details ">
                              <div className="pull-left inline-block">
                                <h4 className="challengecard-title">
                                  <div>{question.title}</div>
                                  <div className="card-details pmT">
                                    <span className="difficulty easy detail-item">
                                      {question.difficulty}
                                    </span>
                                    <span className="skill detail-item">
                                      &nbsp; {question.programming_language}
                                    </span>
                                    <span className="max-score detail-item">
                                      Max Score: 10
                                    </span>
                                    <span className="success-ratio detail-item">
                                      Success Rate: 90.39%
                                    </span>
                                  </div>
                                </h4>
                              </div>
                            </div>
                            <span className="bookmark-cta">
                              <button
                                className="ui-btn star-button"
                                aria-label="Add bookmark"
                              >
                                <div className="ui-content align-icon-right">
                                  <span className="ui-text" aria-hidden="false">
                                    <i className="fa-regular fa-star"></i>
                                  </span>
                                </div>
                              </button>
                            </span>
                            <div className="cta-container">
                              <div className="ctas">
                                <div className="challenge-submit-btn">
                                  <button className="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled solve-btn">
                                    <div className="ui-content align-icon-right">
                                      <span
                                        className="ui-text"
                                        aria-hidden="false"
                                      >
                                        Solve Challenge
                                      </span>
                                    </div>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </header>
                        </div>
                      </div>
                      <div
                        className="__react_component_tooltip place-top type-dark "
                        data-id="tooltip"
                      ></div>
                    </div>
                  );
                })}
              {/* <div className="single-item challenges-list-view-v2 first-challenge cursor">
                <div
                  id="contest-challenges-problem"
                  className="individual-challenge-card-v2 content--list-v2 track_content"
                >
                  <div className="content--list_body">
                    <header className="content--list_header-v2">
                      <div className="challenge-name-details ">
                        <div className="pull-left inline-block">
                          <h4 className="challengecard-title">
                            Python If-Else
                            <div className="card-details pmT">
                              <span className="difficulty easy detail-item">
                                Easy
                              </span>
                              <span className="skill detail-item">
                                Python (Basic)
                              </span>
                              <span className="max-score detail-item">
                                Max Score: 10
                              </span>
                              <span className="success-ratio detail-item">
                                Success Rate: 90.39%
                              </span>
                            </div>
                          </h4>
                        </div>
                      </div>
                      <span className="bookmark-cta">
                        <button
                          className="ui-btn star-button"
                          aria-label="Add bookmark"
                        >
                          <div className="ui-content align-icon-right">
                            <span className="ui-text" aria-hidden="false">
                              <i className="fa-regular fa-star"></i>
                            </span>
                          </div>
                        </button>
                      </span>
                      <div className="cta-container">
                        <div className="ctas">
                          <div className="challenge-submit-btn">
                            <button className="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled solve-btn">
                              <div className="ui-content align-icon-right">
                                <span className="ui-text" aria-hidden="false">
                                  Solve Challenge
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>
                <div
                  className="__react_component_tooltip place-top type-dark "
                  data-id="tooltip"
                ></div>
              </div> */}
              {/* <div className="single-item challenges-list-view-v2 first-challenge cursor">
                <div
                  id="contest-challenges-problem"
                  className="individual-challenge-card-v2 content--list-v2 track_content"
                >
                  <div className="content--list_body">
                    <header className="content--list_header-v2">
                      <div className="challenge-name-details ">
                        <div className="pull-left inline-block">
                          <h4 className="challengecard-title">
                            Python If-Else
                            <div className="card-details pmT">
                              <span className="difficulty easy detail-item">
                                Easy
                              </span>
                              <span className="skill detail-item">
                                Python (Basic)
                              </span>
                              <span className="max-score detail-item">
                                Max Score: 10
                              </span>
                              <span className="success-ratio detail-item">
                                Success Rate: 90.39%
                              </span>
                            </div>
                          </h4>
                        </div>
                      </div>
                      <span className="bookmark-cta">
                        <button
                          className="ui-btn star-button"
                          aria-label="Add bookmark"
                        >
                          <div className="ui-content align-icon-right">
                            <span className="ui-text" aria-hidden="false">
                              <i className="fa-regular fa-star"></i>
                            </span>
                          </div>
                        </button>
                      </span>
                      <div className="cta-container">
                        <div className="ctas">
                          <div className="challenge-submit-btn">
                            <button className="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled solve-btn">
                              <div className="ui-content align-icon-right">
                                <span className="ui-text" aria-hidden="false">
                                  Solve Challenge
                                </span>
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </header>
                  </div>
                </div>
                <div
                  className="__react_component_tooltip place-top type-dark "
                  data-id="tooltip"
                ></div>
              </div> */}
            </div>
          </div>
          {/* // Right panel  */}
          <div className="filters_panel right-panel">
            <div className="outer_wrapper">
              <div className="inner_wrapper">
                <div className="filter_wrap">
                  <div className="challenge_list_filter">
                    {/* ################## Status*/}
                    <div className="filter-group">
                      <div className="group-label">Status</div>
                      <div className="filters">
                        <div className="ui-checklist" role="group">
                          <div className="ui-checklist-list">
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="solved"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Solved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="unsolved"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Unsolved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ################## Skills */}

                    <div className="filter-group">
                      <div className="group-label">Skills</div>
                      <div className="filters">
                        <div className="ui-checklist" role="group">
                          <div className="ui-checklist-list">
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Problem Solving (Basic)"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">
                                      Problem Solving (Basic)
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Python (Basic)"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Python (Basic)</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Problem Solving (Advanced)"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">
                                      Problem Solving (Advanced)
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Python (Intermediate)"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">
                                      Python (Intermediate)
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ################## Difficulty */}
                    <div className="filter-group">
                      <div className="group-label">Difficulty</div>
                      <div className="filters">
                        <div className="ui-checklist" role="group">
                          <div className="ui-checklist-list">
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Easy"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Easy</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Medium"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Medium</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="Hard"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Hard</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ################## */}
                    {/* <div className="filter-group">
                      <div className="group-label">Status</div>
                      <div className="filters">
                        <div className="ui-checklist" role="group">
                          <div className="ui-checklist-list">
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="solved"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Solved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div className="ui-checklist-list-item">
                              <div className="ui-checklist-item-wrap">
                                <div className="ui-checkbox theme-m">
                                  <label className="label-wrap">
                                    <div className="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        className="checkbox-input"
                                        value="unsolved"
                                      />
                                      <span className="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          className="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div className="label">Unsolved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    {/* ################## */}
                    {/* ################## */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Preparation;
