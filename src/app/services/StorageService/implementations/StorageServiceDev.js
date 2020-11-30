import { StorageServiceModel } from '../StorageServiceModel'

export class StorageServiceDev extends StorageServiceModel {
  async save (path, filename) {
    const imageName = filename
    const imageUrl = `/files/${filename}`

    return { imageName, imageUrl }
  }
}
