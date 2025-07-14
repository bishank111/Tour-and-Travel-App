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
    tourName: title,
    fullName: "",
    phone: "",
    guestSize: 1,
    totalAmt: 0,
    cin: "",
    cout: "",
    status: 0,
  });

  const { register, handleSubmit } = useForm();
  // status:0=pending,1=booked
  const handleChange = (e) => {
    setBooking((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const serviceFee = 0;
  const totalAmount =
    Number(price) * Number(booking.guestSize) + Number(serviceFee);
  useEffect(() => {
    setBooking((v) => ({ ...v, totalAmt: totalAmount }));
  }, []);
  //   send data to the server
  const handleClick = async (e) => {
    // e.preventDefault();
    console.log(e);
    // try {
    //   if (!user || user === undefined || user === null) {
    //     return alert("Please sign in");
    //   }
    //   // setModal(false);
    //   const token = localStorage.getItem("token");
    //   const res = await fetch(`${BASE_URL}/booking`, {
    //     method: "post",
    //     headers: {
    //       "content-type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     // credentials: "include",
    //     body: JSON.stringify(booking),
    //   });

    //   const result = await res.json();

    //   if (!res.ok) {
    //     return alert(result.message);
    //   }
    //   navigate("/thank-you");
    // } catch (err) {
    //   alert(err.message);
    // }
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
              {...register("fullName")}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup>
            <input
              type="text"
              placeholder="Phone"
              id="phone"
              required
              {...register("phone")}
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
              {...register("guestSize")}
              onChange={handleChange}
            />
          </FormGroup>
          <FormGroup row className="align-content-end">
            <Label className="lbl-sm" for="cin" sm={3}>
              Check In
            </Label>
            <Col sm={9}>
              <Input
                id="cin"
                type="date"
                {...register("cin")}
                onChange={handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label className="lbl-sm" for="cout" sm={3}>
              Check Out
            </Label>
            <Col sm={9}>
              <Input
                id="cout"
                type="date"
                {...register("cout")}
                onChange={handleChange}
              />
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
              <span> Rs {price}</span>
            </ListGroupItem>

            <ListGroupItem className="border-0 px-0 total">
              <h5>Total</h5>
              <span> Rs {totalAmount}</span>
            </ListGroupItem>
          </ListGroup>

          <Modal isOpen={modal} toggle={toggle}>
            <ModalHeader toggle={toggle}>Payment Method</ModalHeader>
            <ModalBody>
              <div className="row row-cols-2">
                <div className="col">
                  <img
                    className="img-thumbnail payment-pic"
                    src={esewa}
                    alt=""
                  />
                </div>
                <div className="col">
                  <img
                    className="img-thumbnail payment-pic"
                    src={mastercard}
                    alt=""
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={toggle}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Confirm
              </Button>
            </ModalFooter>
          </Modal>
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
