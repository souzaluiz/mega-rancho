import sharp from 'sharp'
import path from 'path'
import fs from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

export default {
  async resizing (req, res, next) {
    if (!req.file) {
      return next()
    }

    const datetime = Date.now()
    const randomId = uuidv4()
    const imageName = `${randomId}-${datetime}.webp`

    try {
      await sharp(req.file.path)
        .resize(300)
        .webp({ quality: 55 })
        .toFile(path.resolve(__dirname, '..', 'temp', imageName))

      await fs.unlink(req.file.path)
      req.file.path = path.resolve(__dirname, '..', 'temp', imageName)
      req.file.filename = imageName
      next()
    } catch (error) {
      return res.status(400).send(error)
    }
  }
}
