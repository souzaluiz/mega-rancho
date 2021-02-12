import { StorageDevelopment } from './implementations/StorageDevelopment'
import { StorageCloudinary } from './implementations/StorageCloudinary'

const StorageService = process.env.NODE_ENV === 'development'
  ? new StorageDevelopment()
  : new StorageCloudinary()

export default StorageService
