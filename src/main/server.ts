import MongoHelper from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import TypeormHelper from '../infra/db/typeorm/helpers/typeorm-helper'

switch (env.databaseType) {
  case 'mongo':
  case 'mongodb': {
    MongoHelper.connect(env.mongoUrl)
      .then(async () => {
        const app = (await import('./config/app')).default

        app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
      })
      .catch((err) => console.error(err))
    break
  }
  case 'mysql':
  case 'postgres': {
    TypeormHelper.connect().then(async () => {
      const app = (await import('./config/app')).default

      app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
    })
      .catch((err) => console.error(err))
    break
  }
  default: {
    throw new Error('You must specify a valid database type in env config')
  }
}
