import { DataSource } from 'typeorm'
import dotenv from 'dotenv'

dotenv.config()

export default new DataSource(
  {
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    entities: ['src/infra/db/typeorm/entities/*.entity.ts'],
    migrations: ['src/infra/db/typeorm/migrations/*.ts']
  }
)
