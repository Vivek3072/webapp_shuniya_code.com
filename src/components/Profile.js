import React from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
// userscore context
import { userScoreContext } from "../ContextAPI/userScoreContext";
import { useContext } from "react";
const Profile = () => {
  let history = useHistory();
  const { userScore } = useContext(userScoreContext); // user score
  const userID = localStorage.getItem("username");
  return (
    <>
      <div className="fs-1 text-center mt-4">
        Hello 👋 , <span className="text-success"> {userID && userID} </span>
      </div>
      <div className="fs-3 text-center mb-4">
        Welcome to Code.com!! <span className="text-info">(^_^)</span>
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
                  <td>Name</td>
                  <td>{userID && userID}</td>
                </tr>
                {/* <tr>
                  <td>Email</td>
                  <td>email.com</td>
                </tr> */}
                <tr>
                  <td>Score</td>
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
