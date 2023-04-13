import React from "react";

export default function Services() {
  return (
    <div>
      <section id="services" className="services">
        <div className="container">
          <h2 className="text-center">Services</h2>

          <div className="row d-flex flex-wrap justify-content-center">
            <div className="col-md-6 col-lg-3 mx-2 shadow-sm rounded d-flex flex-column  align-items-stretch mb-5 mb-lg-0 text-success">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-emoji-laughing"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M12.331 9.5a1 1 0 0 1 0 1A4.998 4.998 0 0 1 8 13a4.998 4.998 0 0 1-4.33-2.5A1 1 0 0 1 4.535 9h6.93a1 1 0 0 1 .866.5zM7 6.5c0 .828-.448 0-1 0s-1 .828-1 0S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 0-1 0s-1 .828-1 0S9.448 5 10 5s1 .672 1 1.5z" />
              </svg>{" "}
              <h4 className="title"> Offline Library </h4>
              <p className="description">
                We are teaching students offline also
              </p>
            </div>

            <div className="col-md-6 col-lg-3 mx-2 shadow-sm rounded d-flex flex-column align-items-stretch mb-5 mb-lg-0  text-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-laptop"
                viewBox="0 0 16 16"
              >
                <path d="M13.5 3a.5.5 0 0 1 .5.5V11H2V3.5a.5.5 0 0 1 .5-.5h11zm-11-1A1.5 1.5 0 0 0 1 3.5V12h14V3.5A1.5 1.5 0 0 0 13.5 2h-11zM0 12.5h16a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5z" />
              </svg>{" "}
              <h4 className="title"> Providing Laptop </h4>
              <p className="description">
                Join our course and we will provide laptop to study
              </p>
            </div>

            <div className="col-md-6 col-lg-3 mx-2 shadow-sm rounded d-flex  flex-column align-items-stretch mb-5 mb-lg-0 text-warning">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-translate"
                viewBox="0 0 16 16"
              >
                <path d="M4.545 6.714 4.11 8H3l1.862-5h1.284L8 8H6.833l-.435-1.286H4.545zm1.634-.736L5.5 3.956h-.049l-.679 2.022H6.18z" />
                <path d="M0 2a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v3h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-3H2a2 2 0 0 1-2-2V2zm2-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H2zm7.138 9.995c.193.301.402.583.63.846-.748.575-1.673 1.001-2.768 1.292.178.217.451.635.555.867 1.125-.359 2.08-.844 2.886-1.494.777.665 1.739 1.165 2.93 1.472.133-.254.414-.673.629-.89-1.125-.253-2.057-.694-2.82-1.284.681-.747 1.222-1.651 1.621-2.757H14V8h-3v1.047h.765c-.318.844-.74 1.546-1.272 2.13a6.066 6.066 0 0 1-.415-.492 1.988 1.988 0 0 1-.94.31z" />
              </svg>
              <h4 className="title"> Multilingual </h4>
              <p className="description">
                We are aiming to teach coding in multi languages
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
