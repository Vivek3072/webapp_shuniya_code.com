import React, { useState } from "react";
import { firebase, auth, provider } from "./firebase";

import './Login.css'
import GoogleLogo from "../assets/GoogleLogo.png";

const Login = () => {
  // Inputs
  const [username, setUsername] = useState("");
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber("+91".concat(mynumber), verify)
      .then((result) => {
        setfinal(result);
        alert("Code sent on the given number!");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        // window.location.reload()
      });
  };
  const signInWithGoogle = () => {
    provider.setCustomParameters({ prompt: "select_account" });
    auth
      .signInWithPopup(provider)
      .then((result) => {
        localStorage.setItem("user-id", result.user.displayName);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Validate OTP
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        alert("Login Successful!");
        localStorage.setItem("user-id", username);
        window.location.reload();
        // success
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect OTP!");
      });
  };

  return (
    <>
      <div className="py-3">
        {/* Phone Number Section Starts*/}
        <center>
          <div style={{ display: !show ? "block" : "none" }}>
            <div className="input_box">
              <input
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                placeholder="Enter username "
                style={{height:"fit-content"}}
              />
            </div>
            <div className="input_box d-flex flex-row justify-content-center align-items-center">
              <span>+91</span>
              <input
                value={mynumber}
                onChange={(e) => {
                  setnumber(e.target.value);
                }}
                placeholder="phone number"
                style={{height:"fit-content"}}
              />
            </div>
            <div id="recaptcha-container"></div>
            <button onClick={signin} className="btn btn-primary w-full px-auto my-3">
              Send OTP
            </button>
          </div>
        </center>
        <div style={{ display: show ? "block" : "none" }}>
          <center>
            <div className="input_box" >

            <input
              type="text"
              placeholder={"Enter your OTP"}
              onChange={(e) => {
                setotp(e.target.value);
              }}
              style={{height:"fit-content"}}
              ></input>
              </div>
            <button onClick={ValidateOtp} className="btn btn-primary">
              Verify
            </button>
          </center>
        </div>
        {/* Phone Number Section Ends */}


        {/* GOOGLE SIGNIN SECTION STARTS */}
       {!show && 
       <>
        <div className="text-center my-2">Or?</div>

        <div className="google">
          <center>
            <button
              className="border rounded px-3 py-2 shadow-sm mt-3 d-flex flex-row justify-content-center align-items-center"
              style={{ backgroundColor: "white" }}
              onClick={signInWithGoogle}
              >
              <img src={GoogleLogo} style={{ width: "20px" }} alt="" />
              <span className="m-1">Sign In with Google </span>
            </button>
          </center>
        </div>
        </>
        }
        {/* GOOGLE SIGNIN SECTION ENDS */}

      </div>
    </>
  );
};

export default Login;
