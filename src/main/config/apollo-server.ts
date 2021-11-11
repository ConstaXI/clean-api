import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../graphql/type-defs'
import resolvers from '../graphql/resolvers'

export default (): ApolloServer => {
  return new ApolloServer({
    resolvers,
    typeDefs
  })
}
