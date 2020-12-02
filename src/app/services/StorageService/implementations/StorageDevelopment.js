import { StorageService } from '../StorageService'

export class StorageDevelopment extends StorageService {
  async save (path, filename) {
    const imageId = filename
    const imageUrl = `/files/${filename}`

    return { imageId, imageUrl }
  }
}
