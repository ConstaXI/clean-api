import { ApolloServer } from 'apollo-server-express'
import typeDefs from '../graphql/type-defs'
import resolvers from '../graphql/resolvers'
import { Express } from 'express'
import { GraphQLError } from 'graphql'

const handleErrors = (response: any, errors: readonly GraphQLError[]): void => {
  errors.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}
const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(name => errorName)
}

export default (app: Express): void => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
    plugins: [{
      requestDidStart: () => ({
        willSendResponse: ({ response, errors }) => {
          if (!errors) return

          handleErrors(response, errors)
        }
      })
    }]
  })

  apolloServer.start().then(() => {
    apolloServer.applyMiddleware({ app })
  })
}
