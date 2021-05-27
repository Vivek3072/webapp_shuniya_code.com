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

import "./components.css";

function AccordionCard({ title, links, eventKey }) {
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
        <Card.Body className="py-1 px-2">
          <ListGroup variant="flush">
            {links.map((item) => (
              <ListGroup.Item
                action
                href={`/tutorial/${item.replace(/\s+/g, "-").toLowerCase()}`}
                className="text-start accordion-link-box"
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Accordion.Collapse>
    </Card>
  );
}

export default AccordionCard;
