import { Collection } from 'mongodb'
import MongoHelper from '../helpers/mongo-helper'
import * as MockDate from 'mockdate'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeFakeSurvey = async (): Promise<string> => {
  const result = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_image',
      answer: 'any_answer'
    }, {
      answer: 'another_answer'
    }],
    date: new Date()
  })

  return result.insertedId.toHexString()
}

const makeFakeAccount = async (): Promise<string> => {
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  return result.insertedId.toHexString()
}

describe('Account Mongo Repository', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeAll(async () => {
    await MongoHelper.connect('mongodb://localhost:27017/jest')
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccount()
      const surveyId = await makeFakeSurvey()
      const surveyResult = await sut.save({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe('any_answer')
    })

    test('Should update a survey result if it already exists', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccount()
      const surveyId = await makeFakeSurvey()
      const insertResult = await surveyResultCollection.insertOne({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })
      const surveyResult = await sut.save({
        surveyId,
        accountId,
        answer: 'updated_answer',
        date: new Date()
      })
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toEqual(insertResult.insertedId)
      expect(surveyResult.answer).toBe('updated_answer')
    })
  })
})
