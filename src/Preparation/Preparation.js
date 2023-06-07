import React, { useState, useEffect, useContext } from "react";
import "./preparation.css";
import { Link } from "react-router-dom";
import image from "./images/pentagon_bg.svg";
import axios from "axios";
import { userScoreContext } from "../ContextAPI/userScoreContext";
import { useSelector } from "react-redux";

// import FiltersPanel from "./Filters/FiltersPanel";

const Preparation = () => {
  const [questions, setQuestions] = useState([]);
  const [limit, setLimit] = useState(10);
  const [loadingIcon, setloadingIcon] = useState(false);
  // const [scoreValue, setScoreValue] = useState();
  const { userScore } = useContext(userScoreContext);
  // state for toggling the cards of questions
  const [programmingCard, setProgrammingCard] = useState(
    JSON.parse(sessionStorage.getItem("proSelections")) || false
  );

  const language = useSelector((state) => state.language); // for getting the lang.

  // console.log(questions);
  const baseURL =
    "http://43.204.229.206:8000/api/v1/programming-questions/1/1/" +
    limit +
    "/";
  // console.log(baseURL);
  // getting all questions logic
  const getQuestions = async () => {
    try {
      axios.get(baseURL).then((response) => {
        // console.log(response.data);
        // console.log(response.data.question_selected);
        setQuestions(response.data.question_selected);
      });
    } catch (error) {
      alert("Some error occurred. Please refresh the page");
    }
  };

  // more conten loading logic
  const loadMore = () => {
    setloadingIcon(true);
    setLimit(limit + 10);
    setTimeout(() => {
      setloadingIcon(false);
    }, 100);
  };

  // toggleProgrammingSection
  const toggleProgrammingSection = (value) => {
    setProgrammingCard(value);
    sessionStorage.setItem("proSelections", value);
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
                      <Link to="/">
                        {language === "ENG" ? "Home" : "मुखपृष्ठ"}
                      </Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {language === "ENG" ? "Preparation" : "अभ्यास"}
                    </li>
                    {programmingCard && (
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        {language === "ENG"
                          ? "Programming Questions"
                          : "प्रोग्रामिंग प्रश्न"}
                      </li>
                    )}
                  </ol>
                  <div className="page_label_wrapper">
                    {/* <h1 className="page_label">Python</h1> */}
                  </div>
                </div>
              </nav>
              {/* // points section  */}
              <div className="community-header-aside">
                <div className="track-badge-progress">
                  <div className="badge-progress">
                    <div className="remaining">
                      <div className="point-left-wrap">
                        <span className="point-left">
                          {/* 35 more points</span> to
                        get your first star! */}
                          {/* Points: <span className="value">{userScore}</span> */}
                        </span>
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
                        {/* <span className="current-rank">
                          Rank: <span className="value">2565897</span>
                        </span> */}
                        <span className="pipe"></span>
                        {/* <span className="current-points">
                          Points: <span className="value">0/35</span>
                        </span> */}
                        {/* <a
                          className="scoring-link"
                          data-analytics="BadgeLearnMoreLink"
                          data-attr1="python"
                          target="_blank"
                          href=""
                        >
                          <i className="fa-regular fa-circle-info"></i>
                        </a> */}
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
        {/* // cards for programming and other questions  */}
        {!programmingCard && (
          <div className="cards container">
            {/* // Programming section  */}
            <div className="programming_section">
              <h1>
                {language === "ENG"
                  ? "Programming Questions"
                  : "प्रोग्रामिंग प्रश्न"}
              </h1>
              <hr />
              <div className="cards_area">
                {/* // Individual card  */}
                <div
                  className="card"
                  onClick={() => toggleProgrammingSection(true)}
                >
                  <div className="head"></div>
                  <div className="card_content_area">
                    <h3>
                      {language === "ENG"
                        ? "Programming Questions"
                        : "प्रोग्रामिंग प्रश्न"}
                    </h3>
                    <h4>
                      {language === "ENG"
                        ? "level: Intermediate"
                        : "स्तर: इंटरमीडिएट"}
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            {/* <hr /> */}
            {/* // coding normal questions section  */}
            <div className="programming_section Coding_Questions_section">
              <h1>
                {language === "ENG" ? "Coding Questions" : "कोडिंग प्रश्न"}
              </h1>
              <hr />
              <div className="cards_area">
                {/* // Individual card  */}
                <Link to="/practice_questions">
                  <div className="card Coding_section">
                    <div className="head Coding_section">
                      <div className="class">Class 6</div>
                    </div>
                    <div className="card_content_area">
                      <h3>Coding Questions</h3>
                      <h4>level: Easy</h4>
                    </div>
                  </div>
                </Link>
                {/* // duplicate data  */}
                <Link to="/practice_questions">
                  <div className="card Coding_section">
                    <div className="head Coding_section">
                      <div className="class">Class 7</div>
                    </div>
                    <div className="card_content_area">
                      <h3>Coding Questions</h3>
                      <h4>level: Easy</h4>
                    </div>
                  </div>
                </Link>
                <div className="card Coding_section">
                  <div className="head Coding_section">
                    <div className="class">Class 8</div>
                  </div>
                  <div className="card_content_area">
                    <h3>Coding Questions</h3>
                    <h4>level: Easy</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* //Programming question Content section  */}
        {programmingCard && (
          <>
            <div
              className="backButton container mt-4"
              onClick={() => toggleProgrammingSection(false)}
            >
              <i
                className="fa-solid fa-circle-arrow-left"
                title="Back to menu"
              ></i>
            </div>
            <div className="container content_section">
              {/* // Left panel  */}
              <div className="practice_panel left-panel">
                {/* <FiltersPanel /> */}
                {/* // recommended challenge for new user  */}
                {/* <div className="recommended_challenge">
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
                                    Total points: 100
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
                                <button
                                  className="ui-btn ui-btn-normal ui-btn-primary ui-btn-styled"
                                  style={{ backgroundColor: "#007bff" }}
                                >
                                  <div className="ui-content align-icon-right">
                                    <span
                                      className="ui-text"
                                      aria-hidden="false"
                                    >
                                      Solve Question
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
                </div> */}
                {/* // All challenges list  */}
                <div className="challenges-list">
                  {questions !== [] &&
                    questions &&
                    questions.slice(0, limit).map((question, i) => {
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
                                      <div>
                                        {language === "ENG"
                                          ? question.title
                                          : question.title_hi}
                                      </div>
                                      <div className="card-details pmT">
                                        <span className="difficulty easy detail-item">
                                          {question.difficulty < 6
                                            ? "Easy"
                                            : question.difficulty < 10
                                            ? "Medium"
                                            : "Hard"}
                                        </span>
                                        <span className="skill detail-item">
                                          &nbsp; {question.programming_language}
                                        </span>
                                        <span className="max-score detail-item">
                                          Total Points: {question.total_points}
                                        </span>
                                        {/* <span className="success-ratio detail-item">
                                      Success Rate: 90.39%
                                    </span> */}
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
                                      <span
                                        className="ui-text"
                                        aria-hidden="false"
                                      >
                                        <i className="fa-regular fa-star"></i>
                                      </span>
                                    </div>
                                  </button>
                                </span>
                                <div className="cta-container">
                                  <div className="ctas">
                                    <div className="challenge-submit-btn">
                                      <Link
                                        to={`/challenge/${question.programming_ques_id}/${limit}`}
                                      >
                                        <button className="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled solve-btn">
                                          <div className="ui-content align-icon-right">
                                            <span
                                              className="ui-text"
                                              aria-hidden="false"
                                            >
                                              {language === "ENG"
                                                ? "Solve Question"
                                                : "प्रश्न हल करें"}
                                            </span>
                                          </div>
                                        </button>
                                      </Link>
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
                  {limit < questions.length && (
                    <div className="buttonBox">
                      <button className="button loadMore" onClick={loadMore}>
                        Load More &nbsp;
                        <i
                          className={
                            loadingIcon
                              ? "fa-sharp fa-regular fa-loader"
                              : "fa-solid fa-angles-down"
                          }
                        ></i>
                      </button>
                    </div>
                  )}
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
                                        <div className="label">
                                          Python (Basic)
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
          </>
        )}
      </div>
    </>
  );
};

export default Preparation;
