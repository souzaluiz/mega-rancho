const multer = require('multer')
const path = require('path')

const upload = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage: upload })