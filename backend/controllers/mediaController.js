// delete tour
export const deleteMedia = async (req, res) => {
  const id = req.params.id;

  try {
    const fs = require("fs");
    fs.unlinkSync(path, (err) => {
      if (err) {
        console.error(err);
        return;
      }

      //file removed
    });
    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "failed to delete",
    });
  }
};
