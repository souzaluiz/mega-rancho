import { StorageServiceDev } from './implementations/StorageServiceDev'
import { StorageServiceCloudinary } from './implementations/StorageServiceCloudinary'

const StorageService = process.env.ENVIROMENT === 'development'
  ? new StorageServiceDev()
  : new StorageServiceCloudinary()

export default StorageService
