import React from "react";
import { Chart } from "react-google-charts";

import AdminHeader from "../../components/Header/AdminHeader";
import AdminSidebar from "../../components/Header/AdminSidebar";
import useFetch from "../../hooks/useFetch";
import { BASE_URL } from "../../utils/config";
import { Col, Row } from "reactstrap";
const Dashboard = () => {
  const { data: bookings } = useFetch(`${BASE_URL}/booking`);
  return (
    <>
      <AdminHeader />
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-2 sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="col-md-8">
            <Row className="my-5">
              <Col>
                <h3>Manage Booking</h3>
                <table className={"table table-stripe"}>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Tour Name</th>
                      <th>Group Size</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings?.map((booking, index) => (
                      <tr key={booking._id}>
                        <td>{index + 1}</td>
                        <td>{booking.tourName}</td>
                        <td>{booking.guestSize}</td>
                        <td>{booking.totalAmt}</td>

                        <td>{booking.status === 1 ? "booked" : "pending"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
