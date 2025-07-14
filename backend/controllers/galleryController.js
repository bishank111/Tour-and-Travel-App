import Gallery from "../models/Gallery.js";

export const getGallery = async (req, res) => {
    try {
      const gallery = await Gallery.find();
  
      res.status(200).json({
        success: true,
        data: gallery,
      });
    } catch (err) {
      res.status(500).json({ success: true, message: "internal server error" });
    }
};