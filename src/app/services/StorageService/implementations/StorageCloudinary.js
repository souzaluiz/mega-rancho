/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary'
import { StorageService } from '../StorageService'
import fs from 'fs/promises'

export class StorageCloudinary extends StorageService {
  async save (path, filename) {
    const { public_id, url } = await cloudinary.uploader.upload(
      path,
      { folder: 'mega-rancho' }
    )

    fs.unlink(path)

    return {
      imageId: public_id,
      imageUrl: url
    }
  }

  async delete (imageId) {
    await cloudinary.uploader.destroy(imageId)
  }
}
