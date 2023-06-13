import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";

import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Code } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import axiosInstance from "./../axiosApi";
import LoginCard from "./LoginCard";

import firebase from "firebase";
import { useContext } from "react";
import { userScoreContext } from "../ContextAPI/userScoreContext";

// toggle icons import
import EnglishPic from "./Images/Navbar Images/english.png";
import HindiPIc from "./Images/Navbar Images/Hindi.png";
// redux imports for language toggling
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "./state/index";
// toggle icon
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { AudioRecorder } from "react-audio-voice-recorder";
import { useState } from "react";
// import { width } from "@mui/system";

// voice recog imports from
import { axiosIns } from "../voice_recognition/Api/axiosInstance";
import AudioSpectrum from "../voice_recognition/AudioAnnotation/AudioSpectrum";
import "../voice_recognition/App.css";

const NavComponent = () => {
  const { userScore } = useContext(userScoreContext);
  const token = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refresh_token");

  //  voice recognition
  const [toggleVoiceRecog, settoggleVoiceRecog] = useState(false);
  const [url, setUrl] = useState("");
  const [spectogram, setSpectogram] = useState("");
  const [filedata, setFiledata] = useState({});
  const [loading, setLoading] = useState(false);

  let history = useHistory();

  // language toggle functions
  const dispatch = useDispatch(); // for setting the lang.
  const language = useSelector((state) => state.language); // for getting the lang.
  // console.log("Getting the state from store ", language);
  const { toggleLanguage } = bindActionCreators(actionCreators, dispatch);

  // toggle button logic starts here...
  // state for getting the language
  const [alignment, setAlignment] = React.useState(
    localStorage.getItem("LanguagePreference") || JSON.stringify(language)
  );

  // function for changing the state of the language preference
  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);

    if (newAlignment !== null) {
      localStorage.setItem("LanguagePreference", JSON.stringify(newAlignment));
      // toggleLanguage(newAlignment);
    }
  };

  useEffect(() => {
    // checking localstorage for Choosed language.
    const LanguagePreference = localStorage.getItem("LanguagePreference");
    // console.log("parsing data ", LanguagePreference);
    if (LanguagePreference == null) {
      localStorage.setItem("LanguagePreference", JSON.stringify(language));
    }

    setAlignment(JSON.parse(localStorage.getItem("LanguagePreference")));
    toggleLanguage(JSON.parse(localStorage.getItem("LanguagePreference")));
  }, []);
  // toggle button logic ends here...

  const styles = {
    // Adding media query..
    "@media (maxWidth: 993px)": {
      padding: "10px !important",
    },
  };

  // logout
  const handleLogout = async () => {
    try {
      // console.log(localStorage.getItem("refresh_token"));
      const response = await axiosInstance.post("/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user_id");
      localStorage.removeItem("username");
      localStorage.removeItem("user_profile");
      localStorage.removeItem("user_score");

      sessionStorage.removeItem("proSelections");

      axiosInstance.defaults.headers["Authorization"] = null;
      history.push("/");
      window.location.reload();
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleFirebaseLogout = () => {
    firebase.auth().signOut();
    localStorage.removeItem("username");
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_profile");
    localStorage.removeItem("user_score");
    history.push("/");
    window.location.reload();
  };

  // voice  recognition logic starts here #######################
  const addAudioElement = async (blob) => {
    setLoading(true);
    settoggleVoiceRecog(true);
    console.log("blob", blob);
    try {
      const formData = new FormData();
      formData.append("audio", blob);
      const response = await fetch(
        "http://43.204.229.206:8000/api/v1/get_data/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      alert(response);

      const responseData = await response.json();
      console.log(responseData);
      setLoading(false);
      // console.log(responseData);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // axiosIns.get("get_data/").then((result) => {
    //   const data = result.data;
    //   // console.log(result.data);
    //   setUrl(data.sound_url);
    //   //setUrl("https://www2.cs.uic.edu/~i101/SoundFiles/BabyElephantWalk60.wav");
    //   console.log(data.sound_url);
    //   setSpectogram(data.spectogram_url);
    //   // setSpectogram(
    //   //   "https://en.wikipedia.org/wiki/Spectrogram#/media/File:Spectrogram-19thC.png"
    //   //);
    //   setFiledata({
    //     table: data.table,
    //     index: data.index,
    //     serial: data.serial,
    //   });
    //   // setFiledata({
    //   //   table: "table data",
    //   //   index: "data.index",
    //   //   serial: "data.serial",
    //   // });
    //   setTimeout(() => {
    //     console.log("sound url", url);
    //     if (url) {
    //       setLoading(false);
    //     }
    //   }, 2000);
    // });
  }, []);

  const handleRefresh = () => {
    window.location.reload();
  };

  // voice  recognition logic ends here #######################

  return (
    <Navbar className="navbar navbar-light bg-light" bg="light" expand="lg">
      <Link to="/" className="fw-bold fs-3 text-primary my-2 mr-3">
        <Code size={35} className="mr-1" />
        कोड
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <div className="mr-auto">
          <Link to="/" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Home" : "होम"}
          </Link>
          <Link to="/editor" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Editor" : "कोङिग"}
          </Link>
          <Link to="/courses" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Courses" : "कोर्स"}
          </Link>
          {/* <Link to="/about" className="text-dark my-1 mx-2">
            About-Us
          </Link> */}
          <Link to="/preparation" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Preparation" : "अभ्यास"}
          </Link>
        </div>
        <div className="audioElm mx-4">
          <AudioRecorder
            className="mx-4 audio_icon"
            onRecordingComplete={addAudioElement}
            audioTrackConstraints={{
              noiseSuppression: true,
              echoCancellation: true,
            }}
            // downloadOnSavePress={true}
            downloadFileExtension="wav"
          />
        </div>
        <Nav>
          {/* //Language  Toggle buttons  */}
          <div className="toggleBtns" style={styles}>
            <ToggleButtonGroup
              color="primary"
              value={alignment}
              exclusive
              style={{ marginTop: "2px", marginRight: "30px" }}
              onChange={handleChange}
              aria-label="Platform"
            >
              <ToggleButton
                style={
                  alignment === "ENG"
                    ? { padding: "5px", background: "rgb(250 225 111)" }
                    : { padding: "5px" }
                }
                value="ENG"
                onClick={() => toggleLanguage("ENG")}
              >
                <img
                  src={EnglishPic}
                  alt="Switch to English"
                  width="25"
                  title="Switch to English Language"
                />
              </ToggleButton>

              <ToggleButton
                style={
                  alignment === "HI"
                    ? { padding: "5px", background: "rgb(250 225 111)" }
                    : { padding: "5px" }
                }
                value="HI"
                onClick={() => toggleLanguage("HI")}
              >
                <img
                  src={HindiPIc}
                  alt="Switch to Hindi"
                  width="25"
                  title="Switch to Hindi Language"
                />
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          {!token ? (
            <>
              <LoginCard />
            </>
          ) : (
            <>
              <NavDropdown
                title={language === "ENG" ? "Account" : "जानकारी"}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item
                  className="scoreBox"
                  style={{
                    color: "orange",
                    fontSize: "14px",
                    textTransform: "uppercase",
                    borderBottom: "1px solid #aaf",
                  }}
                >
                  {language === "ENG" ? "Score" : "अंक"} : {userScore}
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/profile">
                  {language === "ENG" ? "Profile" : "प्रोफ़ाइल"}
                </NavDropdown.Item>
                {!!refreshToken ? (
                  <NavDropdown.Item
                    type="button"
                    onClick={handleLogout}
                    style={{ color: "#f00" }}
                  >
                    LogOut
                    {/* {language === "ENG" ? "LogOut" : "LogOut/लॉग आउट"} */}
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    type="button"
                    onClick={handleFirebaseLogout}
                    style={{ color: "#f00" }}
                  >
                    LogOut
                    {/* {language === "ENG" ? "LogOut" : "LogOut/लॉग आउट"} */}
                  </NavDropdown.Item>
                )}
              </NavDropdown>
            </>
          )}
          <Link to="/signup" className="btn btn-primary text-white my-1 mx-2">
            Sign Up
          </Link>
        </Nav>
      </Navbar.Collapse>
      {/* // voice recognition panel starts */}
      {toggleVoiceRecog && (
        <>
          <div
            className="blackBackground"
            onClick={() => settoggleVoiceRecog(false)}
          ></div>
          <div className="App voice_panel">
            <div className="close_btn">
              <i
                className="fa-solid fa-square-xmark"
                onClick={() => settoggleVoiceRecog(false)}
              ></i>
            </div>
            {!loading ? (
              <div className="folderid">
                {filedata.table + "/" + filedata.index + "/" + filedata.serial}{" "}
              </div>
            ) : null}

            {!loading ? (
              url && spectogram ? (
                <AudioSpectrum
                  url={url}
                  spectogram={spectogram}
                  filedata={filedata}
                />
              ) : null
            ) : null}
            {loading ? (
              <div className="spinner flex-column">
                <div className="text-center my-4">Loading...</div>
                <div className=" spinner-border text-primary" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            ) : null}
          </div>
        </>
      )}
      {/* // voice recognition panel ends */}
    </Navbar>
  );
};

export default NavComponent;
