import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { BASE_URL } from "../../../utils/config";
import { Button, Col, Form, FormGroup, Row } from "reactstrap";
import AdminHeader from "../../../components/Header/AdminHeader";
import AdminSidebar from "../../../components/Header/AdminSidebar";
const BookingDetailsAdmin = ({ tour }) => {
  const navigate = useNavigate();
  const {
    _id,
    title,
    address,
    city,
    hotel,
    photo,
    price,
    maxGroupSize,
    featured,
    reviews,
  } = tour;
  const handleChange = (e) => {
    //setTour({ ...tour, [e.target.id]: e.target.value });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/tours/${_id}`, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
          role: "admin",
        },
        body: JSON.stringify({
          _id,
        }),
      });
      const result = await res.json();
      if (!res.ok) alert(result.message);
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="container-fluid max-h-100">
        <div className="row h-100">
          <div className="col-md-2 sidebar">
            <AdminSidebar></AdminSidebar>
          </div>
          <div className="col-md-10">
            <div className="d-flex justify-content-between py-3">
              <h4>Tour Details</h4>
              <Link className={"btn btn-info"} to={`/admin/tours`}>
                Tours List
              </Link>
            </div>
            <Form onSubmit={handleClick}>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Tour Name"
                      value={tour.title}
                      required
                      id="title"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="City"
                      value={tour.city}
                      required
                      id="city"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Address"
                      value={tour.address}
                      required
                      id="address"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Duration"
                      value={tour.distance}
                      required
                      id="distance"
                      min="1"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Price"
                      value={tour.price}
                      required
                      id="price"
                      min="1"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="number"
                      placeholder="Max People"
                      value={tour.maxGroupSize}
                      required
                      id="maxGroupSize"
                      min="1"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
              </Row>
              <Row>
                <Col className="mb-3">
                  <FormGroup>
                    <input
                      type="text"
                      placeholder="Hotel"
                      value={tour.hotel}
                      required
                      id="hotel"
                      className="form-control"
                      onChange={handleChange}
                    />
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <FormGroup className="">
                    <select
                      className="form-select"
                      id="featured"
                      defaultValue={tour.featured}
                      onChange={handleChange}
                    >
                      <option value="false">Normal</option>
                    </select>
                  </FormGroup>
                </Col>
                <Col className="mb-3">
                  <div class="input-group mb-3">
                    <input
                      id="photo"
                      type="text"
                      class="form-control"
                      placeholder="select photo"
                      value={tour.photo}
                      onChange={handleChange}
                    />
                    <button class="btn btn-outline-secondary" type="button">
                      Photo
                    </button>
                  </div>
                </Col>
              </Row>
              <Button className="btn btn-primary" type="submit">
                Update Tour
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default BookingDetailsAdmin;
