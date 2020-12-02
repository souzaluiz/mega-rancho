import { StorageDevelopment } from './implementations/StorageDevelopment'
import { StorageCloudinary } from './implementations/StorageCloudinary'

const StorageService = process.env.ENVIROMENT === 'development'
  ? new StorageDevelopment()
  : new StorageCloudinary()

export default StorageService
