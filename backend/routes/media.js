import express from "express";
import multer from "multer";
const router = express.Router();
import * as fs from "node:fs";
import { adminAuth } from "../utils/verifyToken.js";
// import { deleteMedia } from "../controllers/mediaController.js";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "../frontend/public/uploads/");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

const getFiles = async (req, res) => {
  const path = "../frontend/public/uploads/";

  try {
    const files = [];
    fs.readdirSync(path).forEach((file) => {
      files.push(file);
    });
    res.status(200).json({
      success: true,
      count: files.length,
      message: "Successful",
      data: files,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: "not found",
    });
  }
};

router.get("/", getFiles);

// upload file
router.post("/", upload.single("file"), adminAuth);

// delete file
//router.delete("/:id", adminAuth, deleteMedia);
export default router;
