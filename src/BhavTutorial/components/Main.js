import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, ListGroup } from "react-bootstrap";
import "./components.css";
import TopicAccordion from "./TopicAccordion";
import ArticleCard from "./ArticleCard";
import Header from "./Header";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  Redirect,
} from "react-router-dom";

function Main() {
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
    <Router>
      <Switch>
        <Container fluid className="py-5 my-4">
          <Row>
            {showBars || (
              <Col md={4} lg={3} className="px-2">
                <TopicAccordion />
              </Col>
            )}

            <Col sm={12} md={8} lg={9} xs={12} className="px-2">
              <Route
                path="/tutorial/:tutorialTitle"
                component={ArticleCard}
              ></Route>
              <Route path="/bhav-tutorials">
                <Redirect to="/tutorial/bhav-if-else"></Redirect>
              </Route>

              {/* <ArticleCard
                title={"Bhav Programming Language"}
                date={`${date.getDate().toString()}/${date
                  .getMonth()
                  .toString()}/${date.getFullYear().toString()}`}
                texts={[
                  "Python is a high-level, general-purpose and a very popular programming language. Python programming language (latest Python 3) is being used in web development, Machine Learning applications, along with all cutting edge technology in Software Industry. Python Programming Language is very well suited for Beginners, also for experienced programmers with other programming languages like C++ and Java.",
                  "This specially designed Python tutorial will help you learn Python Programming Language in most efficient way, with the topics from basics to advanced (like Web-scraping, Django, Deep-Learning, etc.) with examples.",
                  "Below are some facts about Python Programming Language:",
                ]}
                ></ArticleCard> */}
            </Col>
          </Row>
        </Container>
      </Switch>
    </Router>
  );
}

export default Main;
