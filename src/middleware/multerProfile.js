const multer = require("multer");
const helper = require("../helper/response");

const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "./images");
  },
  filename: (request, file, callback) => {
    callback(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },  
});

const fileFilter = (request, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/webp" ||
    file.mimetype === "application/octet-stream"
  ) {
    cb(null, true);
    console.log(Error)
  } else {
    cb(new Error("Extension file must be PNG , JPEG or webp"), false);
    
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fieldSize: 20 },
}).single("photo_profil");

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      return helper.response(response, 400, err.message);
    } else if (err) {
      return helper.response(response, 400, err.message);
    }
    next();
  });
};

module.exports = uploadFilter;  