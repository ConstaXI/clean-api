import request from 'supertest'
import app from '../config/app'
import MongoHelper from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { AddSurveyModel } from '../../domain/usecases/survey/add-survey'
import jwt from 'jsonwebtoken'
import env from '../config/env'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

let surveyCollection: Collection
let accountCollection: Collection

const makeAccessToken = async (): Promise<string> => {
  const insertResult = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_mail@email.com',
    password: 'any_password',
    role: 'admin'
  })

  const accessToken = jwt.sign(insertResult.insertedId.toHexString(), env.jwtSecret)

  await accountCollection.updateOne({
    _id: insertResult.insertedId
  }, {
    $set: {
      accessToken: accessToken
    }
  })

  return accessToken
}

describe('Surveys Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})

    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('POST /surveys', () => {
    test('Should return 403 on add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send(makeFakeSurveyData())
        .expect(403)
    })

    test('Should return 204 on add survey with valid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .set('x-access-token', await makeAccessToken())
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
      await request(app)
        .get('/api/surveys')
        .set('x-access-token', await makeAccessToken())
        .expect(204)
    })
  })
})
