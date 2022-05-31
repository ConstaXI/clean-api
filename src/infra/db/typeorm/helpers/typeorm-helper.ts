import { DataSource } from 'typeorm'
import dataSource from '../ormconfig'

class TypeormHelper {
  async connect (): Promise<void> {
    await dataSource.initialize()
  }

  async getConnection (): Promise<DataSource> {
    return dataSource
  }

  async disconnect (): Promise<void> {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
    }
  }
}

export default new TypeormHelper()
