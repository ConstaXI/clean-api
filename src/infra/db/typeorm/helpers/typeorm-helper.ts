import { DataSource } from 'typeorm'
import dataSource from '../ormconfig'

class TypeormHelper {
  client: DataSource | undefined

  async connect (): Promise<DataSource> {
    if (this.client) {
      return this.client
    }

    return dataSource
  }

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.destroy()
    }
  }
}

export default new TypeormHelper()
