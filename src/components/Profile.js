import React from "react";
import "./Profile.css";
import { useHistory } from "react-router-dom";
// userscore context
import { userScoreContext } from "../ContextAPI/userScoreContext";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
const Profile = () => {
  let history = useHistory();
  const [toggleModal, settoggleModal] = useState(false);
  // state for updating the updated user data.
  const [updateUserDetails, setUpdateUserDetails] = useState({
    first_name: "",
    last_name: "",
    user_name: "",
    contact_no_1: "",
    contact_no_2: "",
    email_Id: "",
    address: "",
  });

  const { userScore } = useContext(userScoreContext); // user score
  const userID = localStorage.getItem("username");
  const language = useSelector((state) => state.language);

  // onchange event for form
  let name, value;
  const onUpdateChange = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUpdateUserDetails({ ...updateUserDetails, [name]: value });
  };

  // submitting the form data
  const submitUpdatedData = () => {
    alert("Data updated successfully! 🎉");
    console.log("form Submitted :", updateUserDetails);
  };

  // function for toggling modal
  const toggleModalFunc = () => {
    settoggleModal(!toggleModal);
  };
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
          {/* // left panel  */}
          <div className="row-lg col-md-3 leftPanel">
            <div className="profileSection">
              <div className="image">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&usqp=CAU"
                  alt=""
                />
              </div>
              <h4 style={{ marginTop: "5px" }}>
                {userID || userID || "Sahil"}
              </h4>
              <div className="buttons">
                <button onClick={() => toggleModalFunc()}>Edit Profile</button>
              </div>
            </div>
          </div>
          {/* // right panel  */}
          <div className="row col-md-8 rightPanel">
            <div className="userDetailsSection">
              <div className="container">
                {/* <div className="row"> */}
                <div className="field row ">
                  <div className="Fieldname justify-content-md-start col-md-3">
                    {language === "ENG" ? "Username" : "यूजरनेम"}
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
      {/* // Modal for updating the user data  */}
      {/* <!-- Modal --> */}
      {toggleModal && (
        <div
          className="updateModal"
          id="editModal"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="updateModalLabel"
          aria-hidden="true"
        >
          <div className="backDiv" onClick={() => toggleModalFunc()}></div>
          <div className="modal-dialog dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="updateModalLabel">
                  Update your Personal data
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={() => toggleModalFunc()}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                {/* // #### body  */}
                <form class="updateForm">
                  <div class="row">
                    <div class="col-md-6 mb-3">
                      <label for="firstName">First name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="firstName"
                        placeholder=""
                        name="first_name"
                        onChange={onUpdateChange}
                        value={updateUserDetails.first_name}
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid first name is required.
                      </div>
                    </div>
                    <div class="col-md-6 mb-3">
                      <label for="lastName">Last name</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        placeholder=""
                        name="last_name"
                        onChange={onUpdateChange}
                        value={updateUserDetails.last_name}
                        required=""
                      />
                      <div class="invalid-feedback">
                        Valid last name is required.
                      </div>
                    </div>
                  </div>
                  {/* // userName  */}
                  <div class="mb-3">
                    <label for="username">Username</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">👤</span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="your Username"
                        name="user_name"
                        onChange={onUpdateChange}
                        value={updateUserDetails.user_name}
                        required=""
                      />
                      <div class="invalid-feedback" style={{ width: "100%" }}>
                        Your username is required.
                      </div>
                    </div>
                  </div>
                  {/* // Email identity  */}
                  <div class="mb-3">
                    <label for="username">Email Id</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">@</span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="Your Email id"
                        name="email_Id"
                        onChange={onUpdateChange}
                        value={updateUserDetails.email_Id}
                        required=""
                      />
                      <div class="invalid-feedback" style={{ width: "100%" }}>
                        Your username is required.
                      </div>
                    </div>
                  </div>
                  {/* // Mobile No  */}
                  {/* // 1 */}
                  <div class="mb-3">
                    <label for="username">Contact No.</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">📱</span>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        id="username"
                        placeholder="Your contact Number 1"
                        name="contact_no_1"
                        onChange={onUpdateChange}
                        value={updateUserDetails.contact_no_1}
                        required=""
                      />
                      <div class="invalid-feedback" style={{ width: "100%" }}>
                        Your username is required.
                      </div>
                    </div>
                  </div>
                  {/* // 2 */}
                  <div class="mb-3">
                    <label for="username">
                      Contact No. 2<span class="text-muted">(Optional)</span>
                    </label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">📱</span>
                      </div>
                      <input
                        type="number"
                        class="form-control"
                        id="username"
                        placeholder="Your contact Number 2"
                        name="contact_no_2"
                        onChange={onUpdateChange}
                        value={updateUserDetails.contact_no_2}
                        required=""
                      />
                      <div class="invalid-feedback" style={{ width: "100%" }}>
                        Your username is required.
                      </div>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="username">Address</label>
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">🏠</span>
                      </div>
                      <textarea
                        type="text"
                        class="form-control"
                        id="username"
                        placeholder="Your address"
                        name="address"
                        onChange={onUpdateChange}
                        value={updateUserDetails.address}
                        required=""
                      ></textarea>
                      <div class="invalid-feedback" style={{ width: "100%" }}>
                        Your username is required.
                      </div>
                    </div>
                  </div>

                  {/* <hr /> */}
                </form>
                {/* // #### body  */}
              </div>
              <div className="modal-footer" style={{ margin: "auto" }}>
                <button
                  type="button"
                  onClick={() => submitUpdatedData()}
                  className="btn btn-success"
                >
                  Update changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
