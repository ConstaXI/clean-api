import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient | undefined

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect(): Promise<void> {
    if (!this.client) throw new Error('Mongo was not connected')

    await this.client.close()
  }

  getCollection(name: string): Collection {
    if (!this.client) throw new Error('Mongo was not connected')

    return this.client.db().collection(name)
  }

  map(collection: any): any {
    const { _id, ...rest } = collection
    return Object.assign({}, rest, { id: collection._id })
  }
}

export default new MongoHelper()
