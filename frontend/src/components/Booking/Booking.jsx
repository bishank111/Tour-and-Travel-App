import React, { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import "./booking.css";
import {
  Form,
  FormGroup,
  ListGroup,
  ListGroupItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Label,
  Col,
  Input,
} from "reactstrap";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { BASE_URL } from "../../utils/config";
import esewa from "../../assets/images/khalti.png";
import mastercard from "../../assets/images/visa.png";
const Booking = ({ tour, avgRating }) => {
  const { price, reviews, title } = tour;
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [booking, setBooking] = useState({
    userId: user && user._id,
    userEmail: user && user.email,
    tourName: "",
    fullName: "",
    phone: "",
    guestSize: 1,
    totalAmt: 0,
    cin: "",
    cout: "",
    status: 0,
  });

  // status:0=pending,1=booked
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 0;
  const totalAmount = Number(price) * Number(booking.guestSize);
  useEffect(() => {
    setBooking((v) => ({ ...v, totalAmt: totalAmount }));
    setBooking((v) => ({ ...v, tourName: title }));
  });

  //   send data to the server
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      if (!user || user === undefined || user === null) {
        return alert("Please sign in");
      }
      const token = localStorage.getItem("token");
      const res = await fetch(`${BASE_URL}/booking`, {
        method: "post",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        // credentials: "include",
        body: JSON.stringify(booking),
      });

      const result = await res.json();

      if (!res.ok) {
        return alert(result.message);
      }
      navigate("/payment", { state: result.data });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="booking">
      <div className="booking__top d-flex align-items-center justify-content-between">
        <h3>
          Rs {price} <span>/per person</span>
        </h3>
        <span className="tour__rating d-flex align-items-center ">
          <i className="ri-star-s-fill"></i>
          {avgRating === 0 ? null : avgRating} ({reviews?.length})
        </span>
      </div>

      {/* ========== booking form ============= */}
      <Form className="booking__info-form" onSubmit={handleClick}>
        <div className="booking__form">
          <h5>Information</h5>
          <FormGroup>
            <input
              type="text"
              placeholder="Full Name"
              id="fullName"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center gap-3">
            <input
              type="number"
              placeholder="People"
              id="guestSize"
              min="1"
              max={tour.maxGroupSize}
              required
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <Label className="lbl-sm">
              Package Duration: {tour.distance} days
            </Label>
          </FormGroup>
          <FormGroup row className="align-content-end">
            <Label className="lbl-sm" for="cin" sm={3}>
              Check In
            </Label>
            <Col sm={9}>
              <Input id="cin" type="date" onChange={handleChange} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="lbl-sm" for="cout" sm={3}>
              Check Out
            </Label>
            <Col sm={9}>
              <Input id="cout" type="date" onChange={handleChange} />
            </Col>
          </FormGroup>
        </div>
        {/* ========== booking end ============= */}

        {/* ========= booking bottom ============ */}
        <div className="booking__bottom">
          <ListGroup>
            <ListGroupItem className="border-0 px-0">
              <h5 className="d-flex align-items-center gap-1">
                Rs {price} <i className="ri-close-line"></i> {booking.guestSize}{" "}
                person
              </h5>
              <span> Rs {totalAmount}</span>
            </ListGroupItem>

            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span> Rs {totalAmount}</span>
            </ListGroupItem>
          </ListGroup>
        </div>
        <Button
          type="submit"
          className="btn primary__btn w-100 mt-4"
          // onClick={toggle}
        >
          Book Now
        </Button>
      </Form>
    </div>
  );
};

export default Booking;
