import express from "express";
import {
  getUserBooking,
  initiateBooking,
} from "../controllers/userBookingController.js";

const router = express.Router();
router.get("/", getUserBooking);
router.post("/initiate", initiateBooking);

export default router;
