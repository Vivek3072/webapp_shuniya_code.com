import React from "react";
import { Link } from "react-router-dom";
import Coding from "../../../src/assets/Coding.svg";
import Services from "./Services";
import { useSelector } from "react-redux";

export default function HomePage() {
  // getting language state
  const language = useSelector((state) => state.language); // for getting the lang.
  return (
    <>
      <section id="hero" className="d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 pt-5 pt-lg-0 order-1 order-lg-1 d-flex flex-column justify-content-center">
              <h1 className="m-0 fs-1">
                {language === "ENG"
                  ? "Learn coding from the best without any barrier!"
                  : "सर्वश्रेष्ठ से बिना किसी बाधा के कोडिंग सीखें!"}
              </h1>
              <div className="my-3">
                {language === "ENG"
                  ? "We are here with a solution for those students who always wanted to learn coding but can't because of language barrier"
                  : "हम यहां उन छात्रों के लिए एक समाधान लेकर आए हैं जो हमेशा कोडिंग सीखना चाहते थे लेकिन भाषा की बाधा के कारण नहीं सीख पाते।"}
              </div>
              <div className="d-flex flex-row">
                <Link to="/editor" className="mx-2">
                  <div
                    className="bg-primary rounded rounded-5 px-3 py-2 text-light text-center"
                    style={{ width: "fit-content" }}
                  >
                    {language === "ENG"
                      ? " Start Coding"
                      : "कोडिंग प्रारंभ करें"}
                  </div>
                </Link>

                <Link to="/courses" className="mx-2">
                  <div
                    className="border border-secondary rounded rounded-5 px-3 py-2 text-secondary text-center"
                    style={{ width: "fit-content" }}
                  >
                    {language === "ENG" ? "View Courses" : "पाठ्यक्रम देखें"}
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
            <span className="fs-5 mx-2">
              {" "}
              {language === "ENG"
                ? "Having technical issues?"
                : "तकनीकी समस्याएँ हैं?"}
            </span>
            <a
              className="text-info fs-5"
              href="mailto:ankit@shuniyavigyan.com"
              subject="कोड.com Problems"
              style={{ textDecoration: "underline" }}
            >
              {language === "ENG"
                ? "Mail us your query!"
                : "अपनी समस्या हमें मेल करें!"}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
