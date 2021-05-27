import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccordionCard from "./AccordionCard";

function TopicAccordion() {
  return (
    <Accordion defaultActiveKey="0">
      <AccordionCard
        title={"Introduction"}
        links={[
          "Bhav Programming Language",
          "Bhav Language Introduction",
          "Bhav Language Advantages",
          "Bhav basics",
          "Keywords in Bhav",
          "Namespace and Scope in Bhav",
          "Statement, Indentation and Comments in Bhav",
          "Assign Values to Variables in Bhav",
        ]}
        eventKey={"0"}
      ></AccordionCard>
      <AccordionCard
        title={"Input/Output"}
        links={[
          "Taking input in Bhav",
          "Taking input from console in Bhav",
          "Taking multiple inputs from user in Bhav",
          "Bhav | Output string using print() function",
          "How to print without newline in Bhav?",
          "Bhav end parameter in print()",
          "Bhav sep parameter in print()",
          "Bhav | Output formatting",
        ]}
        eventKey={"1"}
      ></AccordionCard>
      <AccordionCard
        title={"Operators"}
        links={[
          "Bhav Operators",
          "Ternary Operator in Bhav",
          "Division Operators in Bhav",
          "Operator Overloading in Bhav",
        ]}
        eventKey={"2"}
      ></AccordionCard>
      <AccordionCard
        title={"Control Flow"}
        links={[
          "Bhav If Else",
          "Chaining comparison operators in Bhav",
          "Bhav For Loop",
          "Bhav While Loop",
          "Bhav break statement",
          "Bhav continue statement",
        ]}
        eventKey={"3"}
      ></AccordionCard>
    </Accordion>
  );
}

export default TopicAccordion;
