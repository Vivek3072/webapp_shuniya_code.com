import React from "react";
import { Link } from "react-router-dom";

export default function RefundPolicy() {
  return (
    <div className="container my-5">
      <h1>Refund Policy</h1>
      <p>
        At कोड.com, we strive to provide high-quality
        products and services that meet our customers' needs. However, due to
        the nature of our business, we do not offer refunds or exchanges on any
        of our products or services. By purchasing from कोड.com,, you
        acknowledge and agree to these terms.
      </p>
      <Link to="/" className="btn btn-primary">Go to Home</Link>
    </div>
  );
}
