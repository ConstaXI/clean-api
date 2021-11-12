import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../graphql/type-defs'
import resolvers from '../graphql/resolvers'
import { Express } from 'express'

export default (app: Express): void => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs
  })

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app })
  })
}
