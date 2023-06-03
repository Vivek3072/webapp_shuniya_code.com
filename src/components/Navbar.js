import React, { useEffect } from "react";
import { Link } from "react-router-dom";

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

const NavComponent = () => {
  const { userScore } = useContext(userScoreContext);
  const token = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refresh_token");

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
    "@media (max-width: 993px)": {
      padding: "10px",
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
    history.push("/");
    window.location.reload();
  };

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
            {language === "ENG" ? "Home" : "मुखपृष्ठ"}
          </Link>
          <Link to="/editor" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Editor" : "संपादक"}
          </Link>
          <Link to="/courses" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Courses" : "पाठ्यक्रम"}
          </Link>
          {/* <Link to="/about" className="text-dark my-1 mx-2">
            About-Us
          </Link> */}
          <Link to="/preparation" className="text-dark my-1 mx-2">
            {language === "ENG" ? "Preparation" : "अभ्यास"}
          </Link>
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
    </Navbar>
  );
};

export default NavComponent;
