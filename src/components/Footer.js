import React from "react";

function Footer() {
  return (
    <footer className="text-center text-lg-start bg-dark text-light">
      <section className="">
        <div className="container text-center text-md-start mt-5">
          <div className="row mt-3">
            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <div className="text-uppercase fw-bold fs-3">
                कोड.<span className="fs-6">com</span>
              </div>
              <div className="fs-6 ms-5">by Shuniyavigyan</div>
              <div className="text-left text-secondary my-1">
                We are an online platform who aim to teach students coding in
                their native language.This is to help all those students out
                there who want to learn coding but can't because of language
                barrier!
              </div>
            </div>

            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <h6 className="text-uppercase fw-bold mb-2">Contact</h6>
              <ul className="text-left">
                <li className="p-1">Boring Road, Patna, Bihar</li>
                <li className="p-1">ankit@shuniyavigyan.com</li>
                <li className="p-1">+91 74780 95666</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className="text-center p-4 bg-dark border border-t-secondary">
        © 2023 Copyright:
        <a
          className="text-reset fw-bold mx-1"
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
