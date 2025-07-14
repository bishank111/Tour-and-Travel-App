import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    src: {
        type: String
    }
  }
)
export default mongoose.model("Gallery", gallerySchema);