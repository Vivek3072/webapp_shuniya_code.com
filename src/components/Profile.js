import React from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
const Profile = () => {
  let history = useHistory();
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
            <table class="table">
              <thead>
                <tr></tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>Sahil</td>
                </tr>
                <tr>
                  <td>Email</td>
                  <td>email.com</td>
                </tr>
                <tr>
                  <td>Score</td>
                  <td>300</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="edit_buttons container">
        <button>Edit Profile</button>
        <button onClick={() => history.goBack()}>Go Back</button>
      </div>
    </>
  );
};

export default Profile;
