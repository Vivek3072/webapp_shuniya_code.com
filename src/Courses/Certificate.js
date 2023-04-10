import React from "react";

import { Code } from "react-bootstrap-icons";
import Medal from "../assets/Medal.png";
const name = localStorage.getItem("user-id")


const Certificate = React.forwardRef((props, ref) => (
  <div ref={ref} className="certificate_container shadow p-4 text-center">
    <div className="certificate">
      <div className="medal">
        <img src={Medal} alt="" />
      </div>
      <div className="fs-3 my-2 me-auto">
        <Code size={60} className="mr-1" />
        कोड
      </div>
      <div className="fs-3 text-primary"> Certificate of completion</div>
      <div>Presented to</div>
      <div className="fs-4 mb-1">Mr. {name && name}</div>
      <div>for successfully completing our course scoring {props.score}/4 </div>
      <div className="fs-5 fw-bold mb-4">Python</div>
      <div>Provided by</div>
      <div>Kode.com</div>
      <div>on XX Jan 2023</div>
    </div>
  </div>
));

export default Certificate;
