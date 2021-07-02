import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import TopicAccordion from "./TopicAccordion";
import TopicAccordionHindi from "./TopicAccordianHindi";

function Header() {
  const [showBars, setShowBars] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [lang, setLang] = useState(TopicAccordionHindi);

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 768) {
        setShowBars(true);
      } else {
        setShowBars(false);
      }
    });
    return () => {
      window.removeEventListener("resize", () => {
        if (window.innerWidth < 768) {
          setShowBars(true);
        } else {
          setShowBars(false);
        }
      });
    };
  });

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <Navbar fixed="top" expand="lg" variant="light" bg="light" className="px-4">
      {showBars && (
        <FontAwesomeIcon
          icon={faBars}
          className="icon"
          onClick={() => {
            setShowModal(true);
            console.log("icon");
          }}
        ></FontAwesomeIcon>
      )}
      <Container>
        <Navbar.Brand href="/" className="mx-auto">
          कोड.com
        </Navbar.Brand>
        <Nav>
          <Nav.Link href="/homepage">Home</Nav.Link>
        </Nav>
        
      </Container>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="mx-0 px-0"
      >
        <Modal.Header>
          <FontAwesomeIcon icon={faTimes} onClick={handleClose} />
        </Modal.Header>

        <TopicAccordion />
      </Modal>
    </Navbar>
  );
}

export default Header;
