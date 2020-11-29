const multer = require('multer')
const path = require('path')

const upload = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '..', '..', 'uploads'))
  },
  filename: function (req, file, cb) {
    file.originalname = file.originalname.replace(' ', '_')
    cb(null, file.originalname)
  }
})

module.exports = multer({ storage: upload })
