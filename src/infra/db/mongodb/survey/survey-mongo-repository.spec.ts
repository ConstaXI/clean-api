import { Collection } from 'mongodb'
import MongoHelper from '../helpers/mongo-helper'
import { SurveyMongoRepository } from './survey-mongo-repository'
import { AddSurveyModel } from '../../../../domain/usecases/add-survey'
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

let surveyCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeAll(() => {
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

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should add a survey on success', async () => {
    const sut = makeSut()
    await sut.addSurvey(makeFakeSurveyData())
    const survey = await surveyCollection.findOne({ question: 'any_question' })
    expect(survey).toBeTruthy()
  })
})
