import { Collection, MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient | undefined
  uri: string | undefined

  async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  }

  async disconnect(): Promise<void> {
    if (!this.client) throw new Error('Mongo was not connected')

    await this.client.close()
  }

  async getCollection(name: string): Promise<Collection> {
    if (!this.uri) throw new Error('Mongo was not connected')

    if (!this.client) {
      await this.connect(this.uri)
    }

    // @ts-expect-error
    return this.client.db().collection(name)
  }

  map(collection: any): any {
    const { _id, ...rest } = collection
    return Object.assign({}, rest, { id: collection._id })
  }
}

export default new MongoHelper()
