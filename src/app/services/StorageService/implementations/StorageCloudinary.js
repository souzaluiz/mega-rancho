/* eslint-disable camelcase */
import { v2 as cloudinary } from 'cloudinary'
import { StorageService } from '../StorageService'

export class StorageCloudinary extends StorageService {
  async save (path, filename) {
    const { public_id, url } = await cloudinary.uploader.upload(
      path,
      { folder: 'mega-rancho' }
    )

    return {
      imageId: public_id,
      imageUrl: url
    }
  }
}
