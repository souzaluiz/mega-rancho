import { StorageServiceDev } from './implementations/StorageServiceDev'

const StorageService = process.env.ENVIROMENT === 'development'
  ? new StorageServiceDev()
  : null

export default StorageService
