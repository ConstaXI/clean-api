import MongoHelper from '../../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { ApolloServer, gql } from 'apollo-server-express'
import { makeApolloServer } from '../helpers/helper'
import { createTestClient } from 'apollo-server-integration-testing'

let accountCollection: Collection
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    apolloServer = makeApolloServer()
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('Login Query', () => {
    test('Should return an token on valid credentials', async () => {
      const loginQuery = gql`
        query login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            accessToken
          }
        }
      `
      const hashedPassword = await hash('any_password', 12)
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: hashedPassword
      })
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(loginQuery, {
        variables: {
          email: 'any_email@mail.com',
          password: 'any_password'
        }
      })

      expect(response.data.login.accessToken).toBeTruthy()
    })
  })

  describe('SignUp Mutation', () => {
    test('Should return an token on valid values', async () => {
      const signUpQuery = gql`
        mutation signup($name: String!, $email: String!, $password: String!, $passwordConfirmation: String!) {
          signup(name: $name, email: $email, password: $password, passwordConfirmation: $passwordConfirmation) {
            accessToken
          }
        }
      `
      const { query } = createTestClient({ apolloServer })
      const response: any = await query(signUpQuery, {
        variables: {
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        }
      })

      expect(response.data.signup.accessToken).toBeTruthy()
    })
  })
})
