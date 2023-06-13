import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Footer() {
  // getting language state
  const language = useSelector((state) => state.language); // for getting the lang.
  return (
    <footer className="footer text-center text-lg-start bg-dark text-light">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-6 col-lg-6 col-xl-6 mx-auto mb-4">
              <div className="text-uppercase text-left fw-bold fs-2">
                कोड.<span className="fs-5">com</span>
              </div>
              <div className="fs-6 text-left">by Shuniyavigyan</div>
              <div className="text-left text-secondary my-1">
                {language === "ENG"
                  ? "We are an online platform who aim to teach students coding in their nativelanguage.This is to help all those students out there who want to learn coding but can't because of language barrier!"
                  : "हम एक ऑनलाइन प्लेटफ़ॉर्म हैं, जिसका उद्देश्य छात्रों को उनकी मूल भाषा में कोडिंग सिखाना है। यह उन सभी छात्रों की मदद करने के लिए है जो कोडिंग सीखना चाहते हैं, लेकिन भाषा की बाधा के कारण नहीं सीख पाते हैं!"}
              </div>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-2">Legals</h6>
              <ul className="text-left">
                <Link to="/contact">
                  <li className="p-1">
                    {language === "ENG" ? "Contact Us" : "संपर्क करें"}
                  </li>
                </Link>
                <Link to="/about">
                  <li className="p-1">
                    {language === "ENG" ? "About Us" : "संबंध"}
                  </li>
                </Link>
                <Link to="/privacy-policy">
                  <li className="p-1">
                    {language === "ENG" ? "Privacy Policy" : "गोपनीयता नीति"}
                  </li>
                </Link>
                <Link to="/refund-policy">
                  <li className="p-1">
                    {language === "ENG"
                      ? "Refund Policy"
                      : "भुगतान वापसी की नीति"}
                  </li>
                </Link>
                <Link to="/terms-conditions">
                  <li className="p-1">
                    {language === "ENG"
                      ? "Terms & Conditions"
                      : "नियम एवं शर्तें"}
                  </li>
                </Link>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-dark border-top border-secondary">
        <span className="text-secondary"> © 2023 Copyright: </span>
        <a
          className="text-secondary mx-1"
          href="https://shiniyavigyan.com/"
          target="_blank"
          rel="noreferrer"
        >
          shuniyavigyan.com
        </a>
      </div>
    </footer>
    // <!-- Footer -->
  );
}

export default Footer;
