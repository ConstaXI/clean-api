import env from './config/env'
import TypeormHelper from '../infra/db/typeorm/helpers/typeorm-helper'

TypeormHelper.connect().then(async () => {
  const app = (await import('./config/app')).default

  app.listen(env.port, () => console.log(`Server running at http://localhost:${env.port}`))
})
  .catch((err) => console.error(err))
