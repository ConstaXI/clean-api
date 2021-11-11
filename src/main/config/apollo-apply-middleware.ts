import { Express } from 'express'
import { ApolloServer } from 'apollo-server-express'

export default (app: Express, apolloServer: ApolloServer): void => {
  apolloServer.applyMiddleware({ app })
}
