import multer from 'multer'
import path from 'path'

const upload = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.resolve(__dirname, '..', 'temp'))
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

export default multer({ storage: upload })
