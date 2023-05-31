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
    <>
      <div className="fs-1 text-center mt-4">
        {language === "ENG" ? "Hello" : "नमस्ते"}
        👋 , <span className="text-success"> {userID && userID} </span>
      </div>
      <div className="fs-3 text-center mb-4">
        {language === "ENG"
          ? "Welcome to Code.com!!"
          : "Code.com में आपका स्वागत है!!"}
        <span className="text-info">(^_^)</span>
      </div>
      <div className="details container">
        <div className="userDetails">
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{language === "ENG" ? "Name" : "नाम"}</td>
                  <td>{userID && userID}</td>
                </tr>
                {/* <tr>
                  <td>Email</td>
                  <td>email.com</td>
                </tr> */}
                <tr>
                  <td>{language === "ENG" ? "Score" : "अंक"}</td>
                  <td>{userScore}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="edit_buttons container">
        <button disabled>Edit Profile</button>
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
    </>
  );
};

export default Profile;
