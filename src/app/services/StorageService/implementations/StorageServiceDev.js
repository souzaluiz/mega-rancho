import { StorageServiceModel } from '../StorageServiceModel'

export class StorageServiceDev extends StorageServiceModel {
  async save (path, filename) {
    const imageId = filename
    const imageUrl = `/files/${filename}`

    return { imageId, imageUrl }
  }
}
