import { SurveyModel } from '../../../domain/models/survey'
import { LoadSurveys } from '../../../domain/usecases/load-surveys'
import { LoadSurveyController } from './load-survey-controller'
import * as MockDate from 'mockdate'
import { noContent, ok, serverError } from '../../helpers/http/http-helper'

const makeFakeSurveys = (): SurveyModel[] => ([
  {
    question: 'any_question_0',
    answers: [{
      image: 'any_image_0',
      answer: 'any_answer_0'
    }],
    date: new Date()
  },
  {
    question: 'any_question_1',
    answers: [{
      image: 'any_image_1',
      answer: 'any_answer_1'
    }],
    date: new Date()
  }
])

const makeLoadSurveysStub = (): LoadSurveys => {
  class LoadSurveyStub implements LoadSurveys {
    async load(): Promise<SurveyModel[]> {
      return makeFakeSurveys()
    }
  }

  return new LoadSurveyStub()
}

type SutTypes = {
  sut: LoadSurveyController
  loadSurveysStub: LoadSurveys
}

const makeSut = (): SutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveyController(loadSurveysStub)
  return {
    sut,
    loadSurveysStub
  }
}

describe('LoadSurveyController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurvey', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })

  test('Should return 500 if loadSurveys throws', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.reject(new Error()))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 204 if there is no surveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    jest.spyOn(loadSurveysStub, 'load').mockReturnValueOnce(Promise.resolve([]))
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(noContent())
  })
})
