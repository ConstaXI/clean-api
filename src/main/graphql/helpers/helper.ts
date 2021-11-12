import { ApolloServer } from 'apollo-server-express'
import resolvers from '../resolvers'
import typeDefs from '../type-defs'

export const makeApolloServer = (): ApolloServer => new ApolloServer({ resolvers, typeDefs })
