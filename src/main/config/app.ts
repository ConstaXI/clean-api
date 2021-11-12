import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupApolloServer from './apollo-server'

export default async function startApp(): Promise<Express> {
  const apolloServer = setupApolloServer()

  await apolloServer.start()

  const app = express()

  apolloServer.applyMiddleware({ app })
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  return app
}
