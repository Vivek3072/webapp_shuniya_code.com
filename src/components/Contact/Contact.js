import React from "react";
import { FaEnvelopeOpenText, FaPhone, FaSearchLocation } from "react-icons/fa";
// language toggle state imports
import { useSelector } from "react-redux";

export default function Contact() {
  const language = useSelector((state) => state.language);
  return (
    <div>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          {language === "ENG" ? "Contact us" : "संपर्क करें"}
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          {language === "ENG"
            ? "Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within a matter of hours to help you."
            : "क्या आपका कोई प्रश्न है? कृपया हमसे सीधे संपर्क करने में संकोच न करें। हमारी टीम आपकी मदद करने के लिए कुछ ही घंटों में आपके पास वापस आएगी।"}
        </p>

        <div className="text-center">
          <ul className="list-unstyled mb-0 d-flex flex-wrap justify-content-center">
            <li>
              <FaSearchLocation />
              <p>
                {language === "ENG"
                  ? "Boring Road, Patna, Bihar"
                  : "बोरिंग रोड, पटना, बिहार"}
              </p>
            </li>

            <li>
              <FaPhone />
              <p>+91 74780 95666</p>
            </li>

            <li>
              <FaEnvelopeOpenText />
              <p>ankit@shuniyavigyan.com</p>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}
