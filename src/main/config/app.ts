import express, { Express } from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import setupSwagger from './swagger'
import setupApolloServer from './apollo-server'
import configApolloServer from './apollo-apply-middleware'

export default async function startApp(): Promise<Express> {
  const apolloServer = setupApolloServer()

  await apolloServer.start()

  const app = express()

  configApolloServer(app, apolloServer)
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)

  return app
}
