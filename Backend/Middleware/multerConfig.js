const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Sets the upload directory to 'my-uploads'
  },
  filename: function (req, file, cb) {
    console.log(file.originalname,"middle")
    console.log(file.filename)
    cb(null, file.originalname); // Keeps the original file name
    
  }
});

const upload = multer({ storage: storage });

module.exports = upload;

