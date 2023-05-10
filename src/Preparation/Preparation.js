import React from "react";
import "./preparation.css";
import { Link } from "react-router-dom";

const Preparation = () => {
  return (
    <>
      <div className="main">
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
                    <h1 className="page_label">Preparation</h1>
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
                        <i class="fa-brands fa-python"></i>
                      </div>
                      <div className="text">Python</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container content_section">
          <div className="practice_panel left-panel">
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
            <div className="challenges-list">
              <div className="single-item challenges-list-view-v2 first-challenge cursor">
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
              </div>
            </div>
          </div>
          <div className="filters_panel right-panel">
            <div className="outer_wrapper">
              <div className="inner_wrapper">
                <div className="filter_wrap">
                  <div className="challenge_list_filter">
                    {/* ################## Status*/}
                    <div class="filter-group">
                      <div class="group-label">Status</div>
                      <div class="filters">
                        <div class="ui-checklist" role="group">
                          <div class="ui-checklist-list">
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="solved"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Solved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="unsolved"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Unsolved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ################## Skills */}

                    <div class="filter-group">
                      <div class="group-label">Skills</div>
                      <div class="filters">
                        <div class="ui-checklist" role="group">
                          <div class="ui-checklist-list">
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Problem Solving (Basic)"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">
                                      Problem Solving (Basic)
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Python (Basic)"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Python (Basic)</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Problem Solving (Advanced)"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">
                                      Problem Solving (Advanced)
                                    </div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Python (Intermediate)"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">
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
                    <div class="filter-group">
                      <div class="group-label">Difficulty</div>
                      <div class="filters">
                        <div class="ui-checklist" role="group">
                          <div class="ui-checklist-list">
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Easy"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Easy</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Medium"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Medium</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="Hard"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Hard</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* ################## */}
                    <div class="filter-group">
                      <div class="group-label">Status</div>
                      <div class="filters">
                        <div class="ui-checklist" role="group">
                          <div class="ui-checklist-list">
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="solved"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Solved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                            <div class="ui-checklist-list-item">
                              <div class="ui-checklist-item-wrap">
                                <div class="ui-checkbox theme-m">
                                  <label class="label-wrap">
                                    <div class="checkbox-wrap">
                                      <input
                                        type="checkbox"
                                        class="checkbox-input"
                                        value="unsolved"
                                      />
                                      <span class="custom-holder outset">
                                        <svg
                                          viewBox="0 0 24 24"
                                          width="1em"
                                          height="1em"
                                          class="checkbox__check-icon ui-svg-icon"
                                          fill="currentColor"
                                        >
                                          <path d="M9 18c-.3 0-.5-.1-.7-.3l-5-5c-.4-.4-.4-1 0-1.4s1-.4 1.4 0L9 15.6 19.3 5.3c.4-.4 1-.4 1.4 0s.4 1 0 1.4l-11 11c-.2.2-.4.3-.7.3z"></path>
                                        </svg>
                                      </span>
                                    </div>
                                    <div class="label">Unsolved</div>
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
