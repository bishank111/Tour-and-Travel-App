import Booking from "../models/Booking.js";

// get user booking
export const getUserBooking = async (req, res) => {
  try {
    const books = await Booking.find({ userId: req.query.id });
    res.status(200).json({
      success: true,
      message: "successful",
      data: books,
    });
  } catch (err) {
    res.status(500).json({ success: true, message: "internal server error" });
  }
};

// initiateBooking
export const initiateBooking = async (req, res) => {
  console.log(req.body.userId);
};
