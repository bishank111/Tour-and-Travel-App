import React from "react";
import { Col, Row } from "reactstrap";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
import useFetch from "../../../hooks/useFetch";
import { BASE_URL } from "../../../utils/config";
import { Link } from "react-router-dom";
const BookingsAdmin = () => {
  const { data: bookings } = useFetch(`${BASE_URL}/booking`);
  return (
    <>
      <AdminHeader />
      <div className="container-fluid max-h-100">
        <Row className="h-100">
          <div className="col-md-2 sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between py-3">
              <h4>Manage Booking</h4>
              <form className="d-flex" action="">
                <input className="form-control" type="search" />
                <button className="btn btn-light ms-2">Search</button>
              </form>
            </div>

            <Row>
              <Col>
                <table className={"table table-stripe"}>
                  <thead>
                    <tr>
                      <th>Booking ID</th>
                      <th>Tour Name</th>
                      <th>Group Size</th>
                      <th>Total Amount</th>
                      <th>Status</th>
                      <th>Action</th>
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
                        <td>
                          <Link className={"btn btn-primary mx-2"} to="#">
                            View Detail
                          </Link>
                          {/* <Link
                            className={"btn btn-primary mx-2"}
                            to={`/admin/bookings/${booking._id}`}
                          >
                            View Detail
                          </Link> */}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Col>
            </Row>
          </div>
        </Row>
      </div>
    </>
  );
};

export default BookingsAdmin;
