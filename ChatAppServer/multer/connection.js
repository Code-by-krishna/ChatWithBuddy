const multer = require('multer');

//multer
const storage = multer.diskStorage({
    destination: function (req, res, cd) {
      cd(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage });

module.exports = upload;