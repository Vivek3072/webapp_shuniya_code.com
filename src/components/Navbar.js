import React from "react";
import { Link } from "react-router-dom";

import { Navbar, NavDropdown, Nav } from "react-bootstrap";
import { Code } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import axiosInstance from "./../axiosApi";
import LoginCard from "./LoginCard";

import firebase from "firebase";
import { useContext } from "react";
import { userScoreContext } from "../ContextAPI/userScoreContext";

const NavComponent = () => {
  const { userScore } = useContext(userScoreContext);
  const token = localStorage.getItem("username");
  const refreshToken = localStorage.getItem("refresh_token");

  let history = useHistory();

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

  const style = {
    scoreBox: {
      color: "orange",
      fontSize: "14px",
      textTransform: "uppercase",
      borderBottom: "1px solid #aaf",
    },
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
            Home
          </Link>
          <Link to="/editor" className="text-dark my-1 mx-2">
            Editor
          </Link>
          <Link to="/courses" className="text-dark my-1 mx-2">
            Courses
          </Link>
          {/* <Link to="/about" className="text-dark my-1 mx-2">
            About-Us
          </Link> */}
          <Link to="/preparation" className="text-dark my-1 mx-2">
            Preparation
          </Link>
        </div>
        <Nav>
          {!token ? (
            <>
              <LoginCard />
            </>
          ) : (
            <>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item className="scoreBox" style={style.scoreBox}>
                  Score : {userScore}
                </NavDropdown.Item>
                <NavDropdown.Item href="/user/profile">
                  Profile
                </NavDropdown.Item>
                {!!refreshToken ? (
                  <NavDropdown.Item type="button" onClick={handleLogout}>
                    LogOut
                  </NavDropdown.Item>
                ) : (
                  <NavDropdown.Item
                    type="button"
                    onClick={handleFirebaseLogout}
                  >
                    LogOut
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
