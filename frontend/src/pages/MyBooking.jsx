import React, { useRef, useEffect, useContext } from "react";
import "../styles/home.css";

import { Row, Col } from "reactstrap";
import Header from "../components/Header/Header";

import Footer from "../components/Footer/Footer";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utils/config";
import { AuthContext } from "../context/AuthContext";
const MyBooking = () => {
  const { user, dispatch } = useContext(AuthContext);
  const { data: bookings } = useFetch(`${BASE_URL}/userbooking?id=${user._id}`);
  return (
    <>
      <Header />
      <div className="container">
        <h5>My booking List</h5>
        <hr />
        <Row>
          <Col>
            <table className={"table table-stripe"}>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Full Name</th>
                  <th>Tour Name</th>
                  <th>Contact</th>
                  <th>Group Size</th>

                  <th>Amount</th>

                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings?.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{index + 1}</td>
                    <td>{booking.fullName}</td>
                    <td>{booking.tourName}</td>
                    <td>{booking.phone}</td>
                    <td>{booking.guestSize}</td>
                    <td>{booking.totalAmt}</td>
                    <td>{booking.status === 1 ? "booked" : "pending"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default MyBooking;
