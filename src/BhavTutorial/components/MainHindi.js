import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, ListGroup } from "react-bootstrap";
import "./components.css";
import TopicAccordion from "./TopicAccordion";
import TopicAccordionHindi from "./TopicAccordianHindi";
import ArticleCard from "./ArticleCard";
import ArticleCardHindi from "./ArticleCardHindi";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

function MainHindi({ tutorialLink , disable}) {
  const [showBars, setShowBars] = useState(false);
  
  const date = new Date();
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
  return (
    <Container fluid className="py-3 my-1">
      <Row>
        {showBars || (
          <Col md={4} lg={3} className="px-2">
            {disable &&
            <TopicAccordionHindi />}
            {!disable && <TopicAccordion/>}
          </Col>
        )}

        <Col sm={12} md={8} lg={9} xs={12} className="px-2">
          <ArticleCardHindi titleLink={tutorialLink}></ArticleCardHindi>
        </Col>
      </Row>
    </Container>
  );
}

export default MainHindi;