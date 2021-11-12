import MongoHelper from '../infra/db/mongodb/helpers/mongo-helper'
import env from './config/env'
import startApp from './config/app'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const app = await startApp()

    app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
  })
  .catch((err) => console.error(err))
