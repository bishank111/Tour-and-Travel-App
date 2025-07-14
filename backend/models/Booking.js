import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    userEmail: {
      type: String,
    },
    tourName: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    guestSize: {
      type: Number,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    totalAmt: {
      type: Number,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    cin: {
      type: Date,
      required: true,
    },
    cout: {
      type: Date,
      required: true,
    },
    status: {
      type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);
