import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";

import tourRoute from "./routes/tours.js";
import userRoute from "./routes/users.js";
import authRoute from "./routes/auth.js";
import reviewRoute from "./routes/reviews.js";
import bookingRoute from "./routes/bookings.js";
import userBookingRoute from "./routes/userbooking.js";
import galleryRoute from "./routes/gallery.js";
import mediaRoute from "./routes/media.js";
dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
  origin: "*",
};

import * as fs from "node:fs";

// database connection
mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("MongoDB database connected");
  } catch (err) {
    console.log("MongoDB database connection failed");
  }
};

// middleware
app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/review", reviewRoute);
app.use("/api/v1/booking", bookingRoute);
app.use("/api/v1/userbooking", userBookingRoute);
app.use("/api/v1/gallery", galleryRoute);
app.use("/api/v1/media", mediaRoute);
app.post("/api/v1/media-del", async (req, res) => {
  const path = "../frontend/public/uploads/";
  console.log(req.body);
  // fs.unlink(req.data.file);
});

app.listen(port, () => {
  connect();
  console.log("server listening on port", port);
});
