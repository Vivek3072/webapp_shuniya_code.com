import React, { useEffect } from "react";
import "./Overview.css";
import axios from "axios";
import { useState } from "react";

export default function Overview() {
  const username = localStorage.getItem("user-id") || "Unknown";
  const [overviewData, setOverviewData] = useState([]);
  const getOverviewData = async () => {
    const response = await axios.get(
      "http://43.204.229.206:8000/api/v1/course/id/course_overview/"
    );
    setOverviewData(response.data);
  };

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // creating a new order
    const result = await axios.post(
      "http://43.204.229.206:8000/api/v1/payment_initiation_donation/",
      {
        mobile_number: "9140823654",
        order_amount: "5000",
        order_currency: "INR",
        receipt: "11_deo_ar_receipt_1",
        email: "abhayptsr@gmail.com",
        person_name: "abhay",
        institution_name: "code.com",
      }
    );
    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    console.log(result, "result");
    // Getting the order details back
    const { amount, id, currency, key } = result.data;

    const options = {
      key: key, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: username,
      description: "Test Transaction",
      // image: { logo },
      order_id: id,
      handler: async function (response) {
        console.log(response, "response");
        const data = {
          orderCreationId: id,
          status: "success",
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://43.204.229.206:8000/api/v1/payment_update_to_database_donation/",
          data
        );

        alert(result.data.msg, "result.data.msg");
      },
      prefill: {
        name: username,
        email: "itabhda@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: `{${username} Corporate Office}`,
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  useEffect(() => {
    getOverviewData();
  }, []);
  return (
    <>
      {overviewData &&
        overviewData.map((overview, index) => {
          return (
            <div className="container-fluid m-0 p-0 rounded" key={index}>
              <div className="d-flex flex-wrap justify-content-start align-items-center">
                <div className="overview_bg py-5">
                  <div className="container d-flex flex-wrap">
                    <div className="fs-1 fw-semibold text-white">
                      {overview.title}
                    </div>
                    <div className="bg-white text-primary px-1 py-0 rounded mx-2 my-auto">
                      {overview.level}
                    </div>
                    <div className="text-warning my-auto">
                      {overview.rating}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-star-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                      </svg>
                    </div>
                  </div>

                  <div className="container my-2 text-white">
                    {overview.description}
                  </div>
                  <div className="container d-flex flex-wrap justify-content-start align-items-center text-white">
                    <button
                      className="btn btn-info my-2 p-2 rounded text-white"
                      onClick={displayRazorpay}
                    >
                      Enroll Now
                    </button>
                    <div className="m-2 fs-5">Price : {overview.price} </div>
                  </div>

                  <div className="container text-white d-flex flex-wrap">
                    <div className="m-2">{overview.reviews} reviews |</div>
                    <div className="m-2">{overview.enrollment} enrolled | </div>
                    <div className="m-2 d-flex flex-row">
                      Languages :
                      {overview.languages &&
                        overview.languages.map((language, index) => {
                          return (
                            <div key={index} className="mx-1">
                              {" "}
                              {language}{" "}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>

                <div className="container d-flex flex-column ">
                  <div className="d-flex flex-column my-2">
                    <div className="fs-3">Instructor's details - </div>
                    <div key={index} className="d-flex flex-row">
                      {overview.instructors.map((instructor, index) => {
                        return (
                          <div
                            key={index}
                            className="shadow-sm m-2 rounded p-3"
                          >
                            <table>
                              <tbody>
                                <tr>
                                  <td className="py-2">
                                    {index + 1}. {instructor.name}
                                  </td>
                                </tr>
                                <tr>
                                  <td className="p-0 text-secondary">
                                    {instructor.title}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="d-flex flex-column align-items-center justify-content-center my-5">
                    <div className="fs-3 my-1">About this course..</div>
                    <iframe
                      width="90%"
                      height="400"
                      src="https://www.youtube.com/embed/I303j4YqPb0"
                      autoPlay
                      title="About Shuniyavigyan"
                    ></iframe>
                  </div>

                  <div>
                    <div className="fs-3"> Course Syllabus week wise</div>
                    {overview.syllabus.map((syllabus, index) => {
                      return (
                        <div
                          key={index}
                          className="shadow-sm my-2 p-2 rounded d-flex flex-row"
                        >
                          <div className="fs-1 fw-bold text-info px-4 py-3">
                            {syllabus.week}
                          </div>
                          <div>
                            <span className="text-info"> Topics... </span>
                            {syllabus.topics.map((topic, index) => {
                              return (
                                <div key={index} className="fs-6">
                                  {index + 1}. {topic}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="d-flex flex-column my-3">
                    <div className="fs-3">
                      What you will achieve from the course...
                    </div>
                    {overview.skills &&
                      overview.skills.map((skill, index) => {
                        return (
                          <li key={index} className="p-1">
                            {skill}
                          </li>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}
