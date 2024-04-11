import multer from "multer";
import path from "path";

const fileUpload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (_req, file, callback) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".png" &&
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".gif" &&
      ext !== ".webp" &&
      ext !== ".bmp" &&
      ext !== ".tiff" &&
      ext !== ".jfif" &&
      ext !== ".tif"
    ) {
      return callback(null, false);
    }
    callback(null, true);
  },
});

export default fileUpload;
