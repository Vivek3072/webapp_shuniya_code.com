
import React from 'react';

import {Navbar, NavDropdown, Button, Nav} from 'react-bootstrap'
import {Code} from 'react-bootstrap-icons';
import  { useHistory } from 'react-router-dom';

import axiosInstance from "./../axiosApi";
import LoginCard from './LoginCard';



const NavComponent = () => {
  const token=localStorage.getItem('access_token');
  let history = useHistory()

  const handleLogout = async () => {
    try{  
      const response = await axiosInstance.post('/blacklist/', {
        "refresh_token": localStorage.getItem("refresh_token")
      });
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
      axiosInstance.defaults.headers['Authorization'] = null
      history.push('/')
      return response
    }
    catch(e) {
      console.log(e)
    }
  }

    return (
  <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/" className="fw-bold">
    <Code size={35} className="mr-1"/>
    कोड
    </Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
    <Nav className="mr-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <NavDropdown title="Student" id="basic-nav-dropdown">
        <NavDropdown.Item href="#action/3.1">Data Structure</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Algorithm</NavDropdown.Item>
      </NavDropdown >
      <NavDropdown title="Class" id="basic-nav-dropdown">
      <NavDropdown.Item href="/class/class_7">Class 7</NavDropdown.Item>
        <NavDropdown.Item href="/class/class_8">Class 8</NavDropdown.Item>
        <NavDropdown.Item href="/class/class_9">Class 9</NavDropdown.Item>
        <NavDropdown.Item href="/class/class_10">Class 10</NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">More</NavDropdown.Item>
      </NavDropdown>
    </Nav>
    <Nav>
      {!token? (
        <>
        <LoginCard/>
        </>
      ): (
        <>
        <Button type="button" variant="light" className="btn text-muted" onClick={handleLogout}>
          LogOut
        </Button>
        </>
      )}
      
      <Nav.Link href="/form">Write</Nav.Link>
      <Button type="button" variant="" className="btn btn-dark fw-bold">
      सदस्य बने </Button>
    </Nav>
  </Navbar.Collapse>
</Navbar>
    )
}

export default NavComponent;