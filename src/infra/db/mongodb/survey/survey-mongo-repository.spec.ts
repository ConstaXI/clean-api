import { Collection } from 'mongodb'
import MongoHelper from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'
import * as MockDate from 'mockdate'
import { AccountModel } from '../../../../domain/models/account'
import { SurveyModel } from '../../../../domain/models/survey'

const makeFakeSurveyData = (): AddSurveyModel => ({
  question: 'any_question',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'another_answer'
  }],
  date: new Date()
})

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection
let accountCollection: Collection
let surveyResultCollection: Collection

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

  describe('addSurvey()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      await sut.addSurvey(makeFakeSurveyData())
      const survey = await surveyCollection.findOne({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const insertedAccount = await accountCollection.insertOne(makeFakeAccount())
      const insertedSurveys = await surveyCollection.insertMany([makeFakeSurveyData(), makeFakeSurveyData()])
      await surveyResultCollection.insertOne({
        surveyId: insertedSurveys.insertedIds[0],
        accountId: insertedAccount.insertedId,
        answer: 'any_answer',
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(insertedAccount.insertedId.toHexString()) as SurveyModel[]
      expect(surveys?.length).toBe(2)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const insertedAccount = await accountCollection.insertOne(makeFakeAccount())
      const sut = makeSut()
      const surveys = await sut.loadAll(insertedAccount.insertedId.toHexString())
      expect(surveys?.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const insertResult = await surveyCollection.insertOne(makeFakeSurveyData())
      const sut = makeSut()
      const survey = await sut.loadById(insertResult.insertedId.toHexString())
      expect(survey).toBeTruthy()
      expect(survey?.id).toBeTruthy()
    })
  })
})
