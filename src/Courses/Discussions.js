import React from "react";
// import { useState } from "react";
import DiscussionData from "./DiscussionData.json";

export default function Discussions() {
  // const [readMore , setReadMore]=useState(100)

  return (
    <div style={{ paddingBottom: "50px" }}>
      <div className="d-flex flex-column">
        <div className="form-floating">
          <textarea
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px" }}
          ></textarea>
          <label htmlFor="floatingTextarea2" className="text-secondary">
            Comments
          </label>
          <button className="btn btn-outline-secondary d-block ms-auto mt-1 mb-2">
            Add comment
          </button>
        </div>

        <div className="flex flex-column">
          {DiscussionData &&
            DiscussionData.map((data, index) => {
              return (
                <>
                  <div className="flex flex-row justify-content-center align-items-center my-2 p-2  rounded">
                    <div className="fs-5">
                      <span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-person-circle text-secondary"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                          <path
                            fill-rule="evenodd"
                            d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"
                          />
                        </svg>{" "}
                      </span>
                      {data.name}{" "}
                      <span className="fs-6 text-secondary">{data.time}</span>
                    </div>
                    <div className="fs-6 ps-4">
                      {data.comment.length <= 0 ? (
                        <div
                          className="bg-opacity-50 py-2 px-3 rounded text-white fst-italic"
                          style={{ backgroundColor: "#c6c6c6" }}
                        >
                          This comment has been deleted{" "}
                        </div>
                      ) : (
                        data.comment
                      )}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}
