import MongoHelper from '../../../infra/db/mongodb/helpers/mongo-helper'
import * as MockDate from 'mockdate'
import { Collection } from 'mongodb'
import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveyByIdRepository } from '../../protocols/db/survey/load-survey-by-id-repository'
import { DbLoadSurveyById } from './db-load-survey-by-id'

type SutTypes = {
  sut: DbLoadSurveyById
  loadSurveyByIdRepositoryStub: LoadSurveyByIdRepository
}

const makeFakeSurvey = (): SurveyModel => (
  {
    question: 'any_question_0',
    answers: [{
      image: 'any_image_0',
      answer: 'any_answer_0'
    }],
    date: new Date()
  }
)

const makeLoadSurveyByIdRepositoryStub = (): LoadSurveyByIdRepository => {
  class LoadSurveyByIdRepositoryStub implements LoadSurveyByIdRepository {
    async loadById(id: string): Promise<SurveyModel | null> {
      return makeFakeSurvey()
    }
  }

  return new LoadSurveyByIdRepositoryStub()
}

const makeSut = (): SutTypes => {
  const loadSurveyByIdRepositoryStub = makeLoadSurveyByIdRepositoryStub()
  const sut = new DbLoadSurveyById(loadSurveyByIdRepositoryStub)
  return {
    sut,
    loadSurveyByIdRepositoryStub
  }
}

let surveyCollection: Collection

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL as string)
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  test('Should call LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(loadAllSpy).toHaveBeenCalledWith('any_id')
  })

  test('Should return Survey on success', async () => {
    const { sut } = makeSut()
    const survey = await sut.loadById('any_id')
    expect(survey).toEqual(makeFakeSurvey())
  })

  test('Should throw if LoadSurveyByIdRepository', async () => {
    const { sut, loadSurveyByIdRepositoryStub } = makeSut()
    jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById').mockReturnValueOnce(Promise.reject(new Error()))
    const promise = sut.loadById('any_id')
    await expect(promise).rejects.toThrow()
  })
})
