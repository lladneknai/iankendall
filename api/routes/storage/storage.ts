import { Router } from "express";
import multer from "multer";
import { MAX_FILE_SIZE } from "api/config";
import UploadImageUC from "./UseCases/UploadImageUC";
import ServeImageUC from "./UseCases/ServeImageUC";

// Configure multer for memory storage (we'll upload to Ampt Storage)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: (req, file, cb) => {
    // Only allow images
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const storageRouter = Router();

storageRouter.post("/upload", upload.single("image"), UploadImageUC);
storageRouter.get("/:folder/:filename", ServeImageUC);

export default storageRouter;
