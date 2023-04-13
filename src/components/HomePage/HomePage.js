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
                We are here with a solution for those students who always wanted to learn coding but can't because of language barrier
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
                    style={{ width: "fit-content"}}
                  >
                    View Courses
                  </div>
                </Link>

              </div>
            </div>
            <div
              className="col-lg-6 order-2 order-lg-2 hero-img"
            >
              <img src={Coding} className="img-fluid animated" alt="" />
            </div>
          </div>
        </div>
      </section>
      <Services />
    </>
  );
}
