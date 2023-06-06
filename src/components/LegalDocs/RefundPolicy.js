import React from "react";
import { Link } from "react-router-dom";
// language toggle state imports
import { useSelector } from "react-redux";

export default function RefundPolicy() {
  const language = useSelector((state) => state.language);
  return (
    <div className="container my-5" div style={{ paddingBottom: "50px" }}>
      <h1> {language === "ENG" ? "Refund Policy" : "भुगतान वापसी की नीति"}</h1>
      <p>
        {language === "ENG"
          ? "At कोड.com, we strive to provide high-quality products and services that meet our customers' needs. However, due to the nature of our business, we do not offer refunds or exchanges on any of our products or services. By purchasing from कोड.com,, you acknowledge and agree to these terms."
          : "Code.com पर, हम अपने ग्राहकों की जरूरतों को पूरा करने वाले उच्च गुणवत्ता वाले उत्पाद और सेवाएं प्रदान करने का प्रयास करते हैं। हालाँकि, हमारे व्यवसाय की प्रकृति के कारण, हम अपने किसी भी उत्पाद या सेवाओं पर रिफंड या एक्सचेंज की पेशकश नहीं करते हैं। Code.com से खरीदारी करके, आप इन शर्तों को स्वीकार करते हैं और उनसे सहमत होते हैं।"}
      </p>
      <Link to="/" className="btn btn-primary">
        {language === "ENG" ? "Go to Home" : "मुखपृष्ठ पर जाओ"}
      </Link>
    </div>
  );
}
