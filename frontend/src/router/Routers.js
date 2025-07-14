import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./../pages/Home";
import Tours from "./../pages/Tours";
import TourDetails from "./../pages/TourDetails";
import Login from "./../pages/Login";
import Register from "./../pages/Register";
import SearchResultList from "./../pages/SearchResultList";
import ThankYou from "../pages/ThankYou";
import Payment from "../pages/Payment";

import Dashboard from "./../pages/admin/Dashboard";
import ToursAdmin from "./../pages/admin/tours/ToursAdmin";
import ToursCreateAdmin from "./../pages/admin/tours/ToursCreateAdmin";
import ToursEditAdmin from "./../pages/admin/tours/ToursEditAdmin";
import BookingsAdmin from "../pages/admin/tours/BookingsAdmin";
import BookingDetailsAdmin from "../pages/admin/tours/BookingDetailsAdmin";
import MyBooking from "../pages/MyBooking";
import UsersAdmin from "./../pages/admin/users/UsersAdmin";
import MediaAdmin from "./../pages/admin/media/MediaAdmin";
import Gallery from "../pages/Gallery";
const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path="/home" element={<Home />} />
      <Route path="/tours" element={<Tours />} />
      <Route path="/tours/:id" element={<TourDetails />} />
      <Route path="/gallery" element={<Gallery />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/thank-you" element={<ThankYou />} />
      <Route path="/tours/search" element={<SearchResultList />} />
      <Route path="/my-booking" element={<MyBooking />} />
      <Route path="/payment" element={<Payment />} />

      {/* admin routes */}
      <Route path="/admin/dashboard" element={<Dashboard />} />
      <Route path="/admin/tours" element={<ToursAdmin />} />
      <Route path="/admin/tours/create" element={<ToursCreateAdmin />} />
      <Route path="/admin/tours/:id" element={<ToursEditAdmin />} />
      <Route path="/admin/bookings" element={<BookingsAdmin />} />
      <Route path="/admin/bookings/:id" element={<BookingDetailsAdmin />} />
      <Route path="/admin/users" element={<UsersAdmin />} />
      <Route path="/admin/media" element={<MediaAdmin />} />
    </Routes>
  );
};

export default Routers;
