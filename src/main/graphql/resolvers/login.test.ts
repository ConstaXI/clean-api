import { hash } from 'bcrypt'
import { ApolloServer, gql } from 'apollo-server-express'
import { createTestClient } from 'apollo-server-integration-testing'
import TypeormHelper from '../../../infra/db/typeorm/helpers/typeorm-helper'
import * as MockDate from 'mockdate'
import { Repository } from 'typeorm'
import AccountEntity from '../../../infra/db/typeorm/entities/account.entity'

let accountRepository: Repository<AccountEntity>
let apolloServer: ApolloServer

describe('Login GraphQL', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    accountRepository = await dataSource.getRepository(AccountEntity)
  })

  afterAll(async () => {
    MockDate.reset()
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  describe('Login Query', () => {
    test('Should return a token on valid credentials', async () => {
      const loginQuery = gql`
        query login($email: String!, $password: String!) {
          login(email: $email, password: $password) {
            accessToken
          }
        }
      `
      const hashedPassword = await hash('any_password', 12)
      await accountRepository.save({
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
