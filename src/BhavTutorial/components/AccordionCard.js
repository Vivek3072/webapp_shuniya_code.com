import React from "react";
import {
  Card,
  Accordion,
  ListGroup,
  Nav,
  ListGroupItem,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { Link, matchPath, NavLink } from "react-router-dom";
import "./components.css";

function AccordionCard({ title, links, eventKey }) {
  let match = matchPath();
  console.log(match);
  return (
    <Card>
      <Accordion.Toggle
        as={Card.Header}
        eventKey={eventKey}
        className="cursor-pointer white-bg text-start"
      >
        {title}
      </Accordion.Toggle>
      <Accordion.Collapse eventKey={eventKey}>
        <Card.Body className="px-0 py-0">
          <ListGroup variant="flush">
            {links.map((item) => (
              <Link
                to={`/tutorial/${item.replace(/\s+/g, "-").toLowerCase()}`}
                className="accordion-link"
              >
                <ListGroup.Item className="text-start accordion-link-box">
                  {item}
                </ListGroup.Item>
              </Link>
            ))}
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default AccordionCard;
