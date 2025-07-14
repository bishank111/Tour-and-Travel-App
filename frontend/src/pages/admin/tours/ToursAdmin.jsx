import React from "react";
import useFetch from "../../../hooks/useFetch";
import { Col, Row } from "reactstrap";
import TourCardAdmin from "./TourCardAdmin";
import { Link } from "react-router-dom";
import { BASE_URL } from "../../../utils/config";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";

const ToursAdmin = () => {
  const { data: tours } = useFetch(`${BASE_URL}/tours`);
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
              <h4>Manage Tours</h4>
              <Link className={"btn btn-info"} to={`/admin/tours/create`}>
                Add New Tour
              </Link>
            </div>
            <Row>
              <Col>
                <table className={"table table-stripe"}>
                  <thead>
                    <tr>
                      <th>Tour Name</th>
                      <th>Address</th>
                      <th>City</th>
                      <th>Hotel</th>
                      <th>Price</th>
                      <th>Group Size</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours?.map((tour) => (
                      <TourCardAdmin tour={tour} key={tour._id} />
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
export default ToursAdmin;
