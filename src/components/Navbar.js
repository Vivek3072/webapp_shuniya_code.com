import React from "react";

import { Navbar, NavDropdown, Button, Nav } from "react-bootstrap";
import { Code } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

import axiosInstance from "./../axiosApi";
import LoginCard from "./LoginCard";

import Axios from "axios";

const NavComponent = () => {
  const token = localStorage.getItem("access_token");
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
      const response = await axiosInstance.post("/blacklist/", {
        refresh_token: localStorage.getItem("refresh_token"),
      });
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      axiosInstance.defaults.headers["Authorization"] = null;
      history.push("/");
      return response;
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/" className="fw-bold">
        <Code size={35} className="mr-1" />
        कोड
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="mr-auto">
          <Nav.Link href="/homepage">Home</Nav.Link>
          <Nav.Link href="/bhav-tutorials">Bhav Tutorials</Nav.Link>

          <NavDropdown title="Class" id="basic-nav-dropdown">
            <NavDropdown.Item href="/class/class_6">Class 6</NavDropdown.Item>
            <NavDropdown.Item href="/class/class_7">Class 7</NavDropdown.Item>
            <NavDropdown.Item href="/class/class_8">Class 8</NavDropdown.Item>
            <NavDropdown.Item href="/class/class_9">Class 9</NavDropdown.Item>
            <NavDropdown.Item href="/class/class_10">Class 10</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Nav>
          {!token ? (
            <>
              <LoginCard />
              <Nav.Link href="/write"> Write</Nav.Link>
            </>
          ) : (
            <>
              <NavDropdown title="Account" id="basic-nav-dropdown">
                <NavDropdown.Item href="/user/profile">
                  {" "}
                  Profile{" "}
                </NavDropdown.Item>
                <NavDropdown.Item type="button" onClick={handleLogout}>
                  LogOut
                </NavDropdown.Item>
              </NavDropdown>
            </>
          )}
          <Button
            type="button"
            variant=""
            onClick={paymentHandler}
            className="ml-3 btn btn-dark fw-bold"
          >
            सदस्य बने{" "}
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavComponent;
