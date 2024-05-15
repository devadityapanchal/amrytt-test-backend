import multer from 'multer';
import path from 'path';

const fileFilter = function (req, file, cb) {
  // Check if uploaded file is an image
  const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error('Only images are allowed'));
  }
  cb(null, true);
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/images'));
  },
  filename: function (req, file, cb) {
    const newFileName = `${file.originalname.split('.').at(0)}_${Date.now()}${path.extname(file.originalname)}`
      .replace(/\s/g, '_')
      .trim();
    cb(null, newFileName);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});
