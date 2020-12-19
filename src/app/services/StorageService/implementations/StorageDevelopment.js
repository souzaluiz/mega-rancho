import { StorageService } from '../StorageService'
import fs from 'fs/promises'
import path from 'path'

export class StorageDevelopment extends StorageService {
  async save (path, filename) {
    const imageId = filename
    const imageUrl = `/files/${filename}`

    return { imageId, imageUrl }
  }

  async delete (imageId) {
    const filepath = path.resolve('src', 'temp', imageId)
    await fs.unlink(filepath)
  }
}
