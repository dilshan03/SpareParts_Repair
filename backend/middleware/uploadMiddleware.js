// uploadMiddleware.js
import multer from "multer";
import path from "path";

// Configure the storage for uploaded images
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Store images in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename with extension
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Max 5MB file size
}).single("picture"); // Only single file upload for 'picture' field

export default upload;
