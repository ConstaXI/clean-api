import { MongoClient } from 'mongodb'

class MongoHelper {
  client: MongoClient | undefined

  async connect(uri: string): Promise<void> {
    this.client = await MongoClient.connect(uri)
  }

  async disconnect(): Promise<void> {
    if (!this.client) throw new Error('Mongo was not connected')

    await this.client.close()
  }
}

export default new MongoHelper()
