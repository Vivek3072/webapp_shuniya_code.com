import React from "react";
import { FaEnvelopeOpenText, FaPhone, FaSearchLocation } from "react-icons/fa";

export default function Contact() {
  return (
    <div>
      <section className="mb-4">
        <h2 className="h1-responsive font-weight-bold text-center my-4">
          Contact us
        </h2>
        <p className="text-center w-responsive mx-auto mb-5">
          Do you have any questions? Please do not hesitate to contact us
          directly. Our team will come back to you within a matter of hours to
          help you.
        </p>

          <div className="text-center">
            <ul className="list-unstyled mb-0 d-flex flex-wrap justify-content-center">
              <li>
                <FaSearchLocation />
                <p>Boring Road, Patna, Bihar</p>
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
