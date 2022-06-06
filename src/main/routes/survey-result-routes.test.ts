import request from 'supertest'
import app from '../config/app'
import jwt from 'jsonwebtoken'
import env from '../config/env'
import SurveyEntity from '../../infra/db/typeorm/entities/survey.entity'
import { Repository } from 'typeorm'
import AccountEntity from '../../infra/db/typeorm/entities/account.entity'
import TypeormHelper from '../../infra/db/typeorm/helpers/typeorm-helper'
import * as MockDate from 'mockdate'

let surveyRepository: Repository<SurveyEntity>
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
    surveyRepository = await TypeormHelper.getRepository(SurveyEntity)
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

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with valid accessToken', async () => {
      const [id, accessToken] = await makeAccessToken()

      const res = await surveyRepository.save({
        question: 'any_question',
        accountId: id,
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      await request(app)
        .put(`/api/surveys/${res.id}/results`)
        .set('x-access-token', accessToken)
        .send({
          answer: 'any_answer'
        })
        .expect(200)
    })
  })

  describe('GET /surveys/:surveyId/results', () => {
    test('Should return 403 on save survey result without accessToken', async () => {
      await request(app)
        .get('/api/surveys/any_id/results')
        .expect(403)
    })

    test('Should return 200 on load survey result with valid accessToken', async () => {
      const [id, accessToken] = await makeAccessToken()

      const res = await surveyRepository.save({
        question: 'any_question',
        accountId: id,
        answers: [{
          image: 'any_image',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      await request(app)
        .get(`/api/surveys/${res.id}/results`)
        .set('x-access-token', accessToken)
        .expect(200)
    })
  })
})
