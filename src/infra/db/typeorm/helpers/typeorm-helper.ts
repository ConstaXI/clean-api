import { DataSource, EntityTarget, Repository } from 'typeorm'
import dataSource from '../ormconfig'

class TypeormHelper {
  async connect (): Promise<void> {
    await dataSource.initialize()
  }

  async getConnection (): Promise<DataSource> {
    return dataSource
  }

  async getRepository<E>(entity: EntityTarget<E>): Promise<Repository<E>> {
    return dataSource.getRepository(entity)
  }

  async disconnect (): Promise<void> {
    if (dataSource.isInitialized) {
      await dataSource.destroy()
    }
  }
}

export default new TypeormHelper()
