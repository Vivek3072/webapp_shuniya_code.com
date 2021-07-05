import React from "react";
import { Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AccordionCard from "./AccordionCard";

function TopicAccordionHindi() {
  return (
    <Accordion defaultActiveKey="3">
      <AccordionCard
        title={"परिचय"}
        links={[
          "भव प्रोग्रामिंग भाषा",
          "भव भाषा परिचय",
          "भव भाषा लाभ",
          "भव मूल बातें",
          "भव के कीवर्ड",
          "भव में नेमस्पेस और स्कोप",
          "भव में वक्तव्य, इंडेंटेशन और टिप्पणियाँ",
          "भव में वैरिएबल को मान करें",
        ]}
        eventKey={"0"}
      ></AccordionCard>
      <AccordionCard
        title={"इनपुट/परिणाम"}
        links={[
          "भव में इनपुट लेना",
          "भव में कंसोल से इनपुट लेना",
          "भव में उपयोगकर्ता से कई इनपुट लेना",
          "भव | पश्य () का उपयोग करके परिणाम",
          "भव में न्यूलाइन के बिना पश्य कैसे करें?",
          "पश्य में भव अंत पैरामीटर ()",
          "Bhav sep parameter in print()",
          "भव | परिणाम स्वरूपण",
        ]}
        eventKey={"1"}
      ></AccordionCard>
      <AccordionCard
        title={"कारक"}
        links={[
          "भव कारक(operator)",
          "अंकगणित कारक(arithmetic operator)",
          "संबंध कारक(relational operator)",
          "भव में ऑपरेटर ओवरलोडिंग",
        ]}
        eventKey={"2"}
      ></AccordionCard>
      <AccordionCard
        title={"भव लूप्स"}
        links={[
          "भव यद तद(if else)",
          "भव में चेनिंग तुलना ऑपरेटर",
          "भव हर(for) लूप",
          "भव जबतक(while) लूप",
          "भव खंडन(break) कथन",
          "भव सतत(continue) कथन",
          "भव जाना(pass) कथन",
        ]}
        eventKey={"3"}
      ></AccordionCard>
    </Accordion>
  );
}

export default TopicAccordionHindi;