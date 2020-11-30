import { StorageServiceDev } from './implementations/StorageServiceDev'
import { StorageServiceCloudinary } from './implementations/StorageServiceCloudnary'

const StorageService = process.env.ENVIROMENT === 'development'
  ? new StorageServiceDev()
  : new StorageServiceCloudinary()

export default StorageService
