/* eslint-disable camelcase */
import { StorageServiceModel } from '../StorageServiceModel'
import { v2 as cloudinary } from 'cloudinary'

export class StorageServiceCloudinary extends StorageServiceModel {
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
