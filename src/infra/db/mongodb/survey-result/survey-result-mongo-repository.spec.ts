import { Collection, ObjectId } from 'mongodb'
import MongoHelper from '../helpers/mongo-helper'
import * as MockDate from 'mockdate'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

const makeFakeSurveyId = async (): Promise<string> => {
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

const makeFakeAccountId = async (): Promise<string> => {
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
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId()
      await sut.save({
        surveyId: surveyId,
        accountId: accountId,
        answer: 'any_answer',
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if it already exists', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId),
        answer: 'any_answer',
        date: new Date()
      })
      await sut.save({
        surveyId: surveyId,
        accountId: accountId,
        answer: 'another_answer',
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.find({
        surveyId: new ObjectId(surveyId),
        accountId: new ObjectId(accountId)
      }).toArray()

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load a survey result', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId()
      await surveyResultCollection.insertMany([
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: 'any_answer',
          date: new Date()
        },
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: 'any_answer',
          date: new Date()
        },
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: 'another_answer',
          date: new Date()
        },
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: 'another_answer',
          date: new Date()
        },
        {
          surveyId: new ObjectId(surveyId),
          accountId: new ObjectId(accountId),
          answer: 'another_answer',
          date: new Date()
        }
      ])
      const surveyResult = await sut.loadBySurveyId(surveyId, accountId)
      expect(surveyResult).toBeTruthy()
    })
  })
})
