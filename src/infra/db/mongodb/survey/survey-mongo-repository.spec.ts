import { Collection } from 'mongodb'
import MongoHelper from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'
import * as MockDate from 'mockdate'

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

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection

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
      await surveyCollection.insertMany([makeFakeSurveyData(), makeFakeSurveyData()])
      const sut = makeSut()
      const surveys = await sut.loadAll()
      expect(surveys?.length).toBe(2)
    })

    test('Should load empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()
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
