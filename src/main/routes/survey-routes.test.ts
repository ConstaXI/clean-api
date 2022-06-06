import request from 'supertest'
import app from '../config/app'
import { AddSurveyModel } from '../../domain/usecases/survey/add-survey'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import TypeormHelper from '../../infra/db/typeorm/helpers/typeorm-helper'
import AccountEntity from '../../infra/db/typeorm/entities/account.entity'
import * as MockDate from 'mockdate'
import { Repository } from 'typeorm'

const makeFakeSurveyData = (accountId?: string): AddSurveyModel => ({
  question: 'any_question',
  accountId: accountId ?? 'any_account_id',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

let accountRepository: Repository<AccountEntity>

const makeAccessToken = async (): Promise<string[]> => {
  const insertResult = await accountRepository.save({
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'any_password'
  })

  const accessToken = jwt.sign(insertResult.id, env.jwtSecret)

  await accountRepository.update({
    id: insertResult.id
  }, {
    accessToken: accessToken
  })

  return [insertResult.id, accessToken]
}

describe('Surveys Routes', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    accountRepository = await TypeormHelper.getRepository(AccountEntity)
  })

  afterAll(async () => {
    MockDate.reset()
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurveyData())
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      const [, accessToken] = await makeAccessToken()

      await request(app)
        .post('/api/surveys')
        .set('x-access-token', accessToken)
        .send(makeFakeSurveyData())
        .expect(204)
    })
  })

  describe('POST /surveys', () => {
    test('Should return 403 on load surveys without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 204 on load surveys with valid accessToken', async () => {
      const [, accessToken] = await makeAccessToken()

      await request(app)
        .get('/api/surveys')
        .set('x-access-token', accessToken)
        .expect(204)
    })
  })
})
