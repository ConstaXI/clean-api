import request from 'supertest'
import app from '../config/app'
import { hash } from 'bcrypt'
import { Repository } from 'typeorm'
import AccountEntity from '../../infra/db/typeorm/entities/account.entity'
import TypeormHelper from '../../infra/db/typeorm/helpers/typeorm-helper'

let accountRepository: Repository<AccountEntity>

describe('Signup Routes', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    accountRepository = await TypeormHelper.getRepository(AccountEntity)
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password',
          passwordConfirmation: 'any_password'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const hashedPassword = await hash('any_password', 12)
      await accountRepository.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: hashedPassword
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'any_email@mail.com',
          password: 'any_password'
        })
        .expect(401)
    })
  })
})
