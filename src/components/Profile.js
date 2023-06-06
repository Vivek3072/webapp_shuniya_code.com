import React from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
// userscore context
import { userScoreContext } from "../ContextAPI/userScoreContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
const Profile = () => {
  let history = useHistory();
  const { userScore } = useContext(userScoreContext); // user score
  const userID = localStorage.getItem("username");

  const language = useSelector((state) => state.language); // for getting the lang.
  return (
    <div className="main">
      {/* // greeting section  */}
      <div className="fs-1 text-center pt-4">
        {language === "ENG" ? "Hello" : "नमस्ते"}
        👋 , <span className="text-success"> {userID && userID} </span>
      </div>
      <div className="fs-3 text-center mb-4">
        {language === "ENG"
          ? "Welcome to Code.com!!"
          : "Code.com में आपका स्वागत है!!"}
        <span className="text-info">(^_^)</span>
      </div>
      {/* // User details section  */}
      <div className="container profile">
        <h1 className="title">User Details</h1>
        <div className="grid row">
          <div className="row-lg col-md-3 leftPanel">
            <div className="profileSection">
              <div className="image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
                  alt=""
                />
              </div>
              <div className="buttons">
                <button disabled>Edit Profile</button>
              </div>
            </div>
          </div>
          <div className="row col-md-8 rightPanel">
            <div className="userDetailsSection">
              <div className="container">
                {/* <div className="row"> */}
                <div className="field row ">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Name" : "नाम"}
                  </div>
                  <div className="value col-md-7">
                    {userID || userID || "Sahil"}
                  </div>
                </div>
                <div className="field row">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Contact No." : "संपर्क नंबर"}
                  </div>
                  <div className="value col-md-7">+91 9876543210</div>
                </div>
                <div className="field row">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Email Id" : "ईमेल आईडी"}
                  </div>
                  <div className="value col-md-7">Sahil@gmail.com</div>
                </div>
                <div className="field row">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Score" : "अंक"}
                  </div>
                  <div className="value col-md-7">{userScore}</div>
                </div>
                <div className="field row">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Address" : "पता"}
                  </div>
                  <div className="value col-md-7">
                    Boring Road, Patna, Bihar
                  </div>
                </div>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
      <div className="edit_buttons container">
        {/* <button disabled>Edit Profile</button> */}
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
    </div>
  );
};

export default Profile;
