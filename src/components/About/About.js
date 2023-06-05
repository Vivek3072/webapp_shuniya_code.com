import React from "react";
import Services from "../HomePage/Services";
// language toggle state imports
import { useSelector } from "react-redux";

export default function About() {
  const language = useSelector((state) => state.language);
  return (
    <>
      <div className="container px-10 md:px-15 py-auto mb-auto mt-5">
        <h1 className="headline text-3xl lg:text-5xl text-[#157D9E] mb-5">
          {language === "ENG"
            ? "Shuniya vigyan, Learn Coding in Hindi & English"
            : "शुनिया विज्ञान, हिंदी और अंग्रेजी में कोडिंग सीखें"}
        </h1>
        <div style={{ textAlign: "justify" }}>
          {language === "ENG"
            ? "Shuniya vigyan is a company which uses Hindi medium to teach coding. This company aims to help a new young generation of India understand the intricacies of coding and generate more interest in this field. The courses offered by ZeroScience cover a wide range of programming languages, including Python, Java, C++, and more. The company uses a variety of teaching methods, including lectures, practical exercises, and projects, to help students learn and master the skills needed to become proficient coders."
            : "शून्यविज्ञान नामक एक कंपनी है जो कोडिंग सीखाने के लिए हिंदी माध्यम का प्रयोग करती है। यह कंपनी भारत की एक नई युवा पीढ़ी को कोडिंग की जटिलताओं को समझने और उन्हें इस फील्ड में अधिक रूचि उत्पन्न करने में मदद करने का लक्ष्य रखती है | शून्यविज्ञान द्वारा प्रदान किए जाने वाले पाठ्यक्रमों में प्रोग्रामिंग भाषाओं की एक विस्तृत श्रृंखला शामिल है, जिनमें Python, Java, C++, और बहुत कुछ शामिल हैं। कंपनी विभिन्न प्रकार की शिक्षण विधियों का उपयोग करती है, जिसमें छात्रों को कुशल कोडर बनने के लिए आवश्यक कौशल सीखने और मास्टर करने में मदद करने के लिए व्याख्यान, व्यावहारिक अभ्यास और परियोजनाएं शामिल हैं"}
        </div>
      </div>
      <Services />
    </>
  );
}
