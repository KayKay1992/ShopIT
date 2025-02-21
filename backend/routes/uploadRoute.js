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

// {/*function to check the filetype */}
// function checkFileType(file, cb){
//     // Allowed file types
//     const filetypes = /jpeg|jpg|png/;
//     // Check ext
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     // Check mime
//     const mimetype = filetypes.test(file.mimetype);
//     if(mimetype && extname){
//         return cb(null, true);
//     } else {
//         cb('Images only!');
//     }
// }
function fileFilter(req, file, cb){
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;

  const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if(mimetype && extname){
    cb(null, true);
  } else {
    cb(new Error('Only images are allowed!'), false);
  }
}

// Initialize Multer to enable upload

const upload = multer({storage, fileFilter});
const uploadSingleImage = upload.single('image');

// Upload route

router.post('/', (req, res) => {
    uploadSingleImage(req, res, function(err) {
      if (err) {
        res.status(400).send({ message: err.message });
      }
      res.status(200).send({
        message: 'Image Successfully Uploaded',
        image: `/${req.file.path}`
      });
    })
});

export default router;

