import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

// Configure Multer storage

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

{/*function to check the filetype */}
function checkFileType(file, cb){
    // Allowed file types
    const filetypes = /jpeg|jpg|png/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mime
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Images only!');
    }
}

// Initialize Multer to enable upload

const upload = multer({
    storage,
    // limits: { fileSize: 1024 * 1024 * 5 }, // 5MB
    // fileFilter: (req, file, cb) => {
    //     checkFileType(file, cb);
    // }
});

// Upload route

router.post('/', upload.single('image'), (req, res) => {
    res.send({ message: 'File uploaded successfully!',
        image: `/${req.file.path}`,
     });
});

export default router;

