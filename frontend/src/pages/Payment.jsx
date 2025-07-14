import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import "../styles/thank-you.css";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
const Payment = () => {
  const location = useLocation();
  const tour = location.state;
  const { user } = useContext(AuthContext);
  const handleClick = async (e) => {
    try {
      const payload = {
        return_url: "https://example.com/payment/",
        website_url: "https://example.com/",
        amount: 1300,
        purchase_order_id: "test12",
        purchase_order_name: "test",
        customer_info: {
          name: "Khalti Bahadur",
          email: "example@gmail.com",
          phone: "9800000123",
        },
      };
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <section>
      <Container>
        <Row>
          <Col lg="12" className="pt-5 text-center">
            <div className="thank__you">
              <span>
                <i className="ri-checkbox-circle-line"></i>
              </span>

              <h3 className="mb-4">Tour Name: {tour.tourName}</h3>
              <h3 className="mb-4">Guest Size: {tour.guestSize}</h3>
              <h3 className="mb-4">Total Amount: {tour.totalAmt}</h3>

              <p>Payment Method:</p>
              <Button className="btn primary__btn w-25" onClick={handleClick}>
                Pay with Khalti
              </Button>

              <Link className="d-block mt-4" to="/home">
                Back to Home
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Payment;
