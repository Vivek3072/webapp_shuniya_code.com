import React from "react";
import { Link } from "react-router-dom";

import { Navbar, NavDropdown, Button, Nav } from "react-bootstrap";
import { Code } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import axiosInstance from "./../axiosApi";
import LoginCard from "./LoginCard";

import Axios from "axios";
import firebase from "firebase";
// import './Footer.css';

const NavComponent = () => {
  const token = localStorage.getItem("user-id");
  const refreshToken = localStorage.getItem("refresh_token");

  let history = useHistory();

  const paymentHandler = async (e) => {
    const API_URL = "http://localhost:8000/";
    e.preventDefault();
    const orderUrl = `${API_URL}order`;
    const response = await Axios.get(orderUrl);
    const { data } = response;
    const options = {
      key: process.env.RAZOR_PAY_TEST_KEY,
      name: "Your App Name",
      description: "Some Description",
      order_id: data.id,
      handler: async (response) => {
        try {
          const paymentId = response.razorpay_payment_id;
          const url = `${API_URL}capture/${paymentId}`;
          const captureResponse = await Axios.post(url, {});
          console.log(captureResponse.data);
        } catch (err) {
          console.log(err);
        }
      },
      theme: {
        color: "#686CFD",
      },
    };
    const rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  const handleLogout = async () => {
    try {
      // console.log(localStorage.getItem("refresh_token"));
      const response = await axiosInstance.post("/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user-id");

      axiosInstance.defaults.headers["Authorization"] = null;
      history.push("/");
      window.location.reload()
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  const handleFirebaseLogout = () => {
    firebase.auth().signOut();
    localStorage.removeItem("user-id");
    history.push("/");
    window.location.reload()
  };

  return (
    <Navbar className='navbar navbar-light bg-light' bg="light" expand="lg" >
      <Link to="/" className="fw-bold fs-3 text-primary my-2 mr-3">
        <Code size={35} className="mr-1" />
        कोड
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <div className="mr-auto">
          {/* {token && (
            <NavDropdown title="Quiz" id="basic-nav-dropdown">
              <NavDropdown.Item href="/quiz">Quiz 1</NavDropdown.Item>
              <NavDropdown.Item href="/quiz_2">Quiz 2</NavDropdown.Item>
            </NavDropdown>
          )} */}
          <Link to="/" className="text-dark my-1 mx-2">Home</Link>
          <Link to="/editor" className="text-dark my-1 mx-2">Editor</Link>
          <Link to="/courses" className="text-dark my-1 mx-2">Courses</Link>
          <Link to="/contact" className="text-dark my-1 mx-2">Contact-Us</Link>
          {/* <NavDropdown title="Tutorials" id="basic-nav-dropdown">
            <NavDropdown.Item href="/bhav-tutorials">Bhav Tutorials</NavDropdown.Item>
            <NavDropdown.Item href="/courses">Courses</NavDropdown.Item>
          </NavDropdown> */}
        </div>
        <Nav>
          {!token ? (
            <>
              <LoginCard />
            </>
          ) : (
            <>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/user/profile">
                  {" "}
                  Profile{" "}
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

            <Button
              type="button"
              variant=""
              onClick={paymentHandler}
              className="ml-3 btn btn-dark fw-bold"
            >
              सदस्य बने
            </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
