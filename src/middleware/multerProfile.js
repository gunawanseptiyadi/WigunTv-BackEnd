const multer = require('multer')
const response = require('../helper/response')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './images')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname)
  }
})

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true)
  } else {
    cb(new Error('File format must be png or jpg'), false)
  }
}

const maxSize = 1 * 1024 * 1024
const upload = multer({
  storage,
  limits: { fileSize: maxSize },
  fileFilter
}).single('photo_profil')

const uploadFilter = (req, res, next) => {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      return response.response(res, 400, err.message)
    } else if (err) {
      return response.response(res, 400, err.message)
    }
    next()
  })
}

module.exports = uploadFilter
