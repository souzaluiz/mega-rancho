const sharp = require('sharp')
const path = require('path')
const fs = require('fs')

module.exports = {
  resizing (req, res, next) {
    const { filename: image } = req.file

    const [name] = image.split('.')
    const imageName = `${Date.now()}-${name}.webp`

    sharp(req.file.path)
      .resize(350)
      .webp({quality: 60})
      .toFile(
        path.resolve(__dirname, '..', '..', 'uploads', imageName)
      )
      .then(() => {
        fs.unlinkSync(req.file.path)
        req.file.filename = imageName
        next()
      })
      .catch(err => {
        return res.status(400).send(err)
      })
  }
}