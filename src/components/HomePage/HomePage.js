import React from "react";
import { Link } from "react-router-dom";
import Coding from "../../../src/assets/Coding.svg";
import Services from "./Services";

export default function HomePage() {
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1 d-flex flex-column justify-content-center">
              <h1 className="m-0 fs-1">
                Learn coding from the best without any barrier!
              </h1>
              <div className="my-3">
                We are here with a solution for those students who always wanted
                to learn coding but can't because of language barrier
              </div>
              <div className="d-flex flex-row">
                <Link to="/editor" className="mx-2">
                  <div
                    className="bg-primary rounded rounded-5 px-3 py-2 text-light text-center"
                    style={{ width: "fit-content" }}
                  >
                    Start Coding
                  </div>
                </Link>

                <Link to="/courses" className="mx-2">
                  <div
                    className="border border-secondary rounded rounded-5 px-3 py-2 text-secondary text-center"
                    style={{ width: "fit-content" }}
                  >
                    View Courses
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-lg-6 order-2 order-lg-2 hero-img">
              <img src={Coding} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
      <Services />

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 col-sm-6 d-flex justify-content-center align-items-center">
            <span className="fs-4 mx-2"> Having technical issues? </span>
            <a
              className="bg-info fs-2 px-3 py-2 rounded text-white"
              href="mailto:ankit@shuniyavigyan.com"
              subject="कोड.com Problems"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                className="bi bi-envelope mx-2"
                viewBox="0 0 16 16"
              >
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z" />
              </svg>
              Mail us your query!
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
