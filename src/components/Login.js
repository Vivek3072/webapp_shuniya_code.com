import React, { useState } from "react";
import { firebase, auth, provider } from "./firebase";

import "./Login.css";
import GoogleLogo from "../assets/GoogleLogo.png";

const Login = () => {
  // Inputs
  const [username, setUsername] = useState("");
  const [mynumber, setnumber] = useState("");
  const [otp, setotp] = useState("");
  const [show, setshow] = useState(false);
  const [final, setfinal] = useState("");

  // backend data save code starts here
  // async function saveData(name, id, email) {
  //   console.log("Saving the data...");
  //   // const userId = localStorage.getItem("user_id");
  //   try {
  //     // getting the user with firebase id of user exist.
  //     const userFound = await fetch(
  //       "http://43.204.229.206:8000/api/v1/get-user-id/" + id,
  //       {
  //         method: "GET", // or 'PUT'
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     );

  //     if (userFound) {
  //       //  setting the user state to  userfound
  //     } else {
  //       const rand = Math.floor(Math.random() * 1000);
  //       const data = {
  //         email: email,
  //         password: rand + rand,
  //         username: name,
  //         first_name: name,
  //         last_name: name,
  //         score: 0,
  //         user_firebase_id: id,
  //       };

  //       // Registering the new user into the DB
  //       const response = await fetch(
  //         "http://43.204.229.206:8000/api/v1/register",
  //         {
  //           method: "POST", // or 'PUT'
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(data),
  //         }
  //       );
  //       const result = await response.json();
  //       console.log("Success:", result);
  //       // Setting the state var to data variable;
  //     }
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // }
  // backend data save code ends here
  // Sent OTP
  const signin = () => {
    if (mynumber === "" || mynumber.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber("+91".concat(mynumber), verify)
      .then((result) => {
        setfinal(result);
        // alert("Code sent on the given number!");
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
        console.log(result, "result");
        localStorage.setItem("user_id", result.user.uid);
        localStorage.setItem("username", result.user.displayName);
        //saveData(result.user.displayName, result.user.uid, result.user.email);
        //console.log("uid from firebase: ", result.user.uid);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
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
        // console.log("Login Successful!");
        localStorage.setItem("user_id", result.user.uid);
        localStorage.setItem("username", username);
        //saveData(username, result.user.uid, result.user.email);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
        // success
      })
      .catch((err) => {
        console.log(err);
        alert("Incorrect OTP!");
      });
  };

  return (
    <>
      <div className="py-5 px-2 my-5 container shadow-sm rounded">
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
                style={{ height: "fit-content" }}
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
                style={{ height: "fit-content" }}
              />
            </div>
            <div id="recaptcha-container"></div>
            <button
              onClick={signin}
              className="btn btn-primary w-full px-auto my-3"
            >
              Send OTP
            </button>
          </div>
        </center>
        <div style={{ display: show ? "block" : "none" }}>
          <center>
            <div className="input_box">
              <input
                type="text"
                placeholder={"Enter your OTP"}
                onChange={(e) => {
                  setotp(e.target.value);
                }}
                style={{ height: "fit-content" }}
              ></input>
            </div>
            <button onClick={ValidateOtp} className="btn btn-primary">
              Verify
            </button>
          </center>
        </div>
        {/* Phone Number Section Ends */}

        {/* GOOGLE SIGNIN SECTION STARTS */}
        {!show && (
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
        )}
        {/* GOOGLE SIGNIN SECTION ENDS */}
      </div>
    </>
  );
};

export default Login;
