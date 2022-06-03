import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { LoadSurveyResultController } from './load-survey-result-controller'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { LoadSurveyResult } from '../../../../domain/usecases/survey-result/load-survey-result'
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { SurveyModel } from '../../../../domain/models/survey'
import * as MockDate from 'mockdate'
import { SaveSurveyResultRequest } from '../save-survey-result/save-survey-result-controller'

const makeFakeRequest = (): SaveSurveyResultRequest => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_answer'
})

const makeFakeSurveyResult = (): SurveyResultModel => ({
  question: 'any_question',
  surveyId: 'any_survey_id',
  answers: [{
    image: 'any_image',
    answer: 'any_answer',
    percent: 0,
    count: 0,
    isCurrentAccountAnswered: true
  }],
  date: new Date()
})

const makeFakeSurvey = (): SurveyModel => ({
  id: 'any_id',
  question: 'any_question',
  accountId: 'any_account_id',
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }],
  date: new Date()
})

const makeLoadSurveyResultStub = (): LoadSurveyResult => {
  class LoadSurveyResultStub implements LoadSurveyResult {
    async loadBySurveyId(surveyId: string, accountId: string): Promise<SurveyResultModel> {
      return makeFakeSurveyResult()
    }
  }

  return new LoadSurveyResultStub()
}

const makeLoadSurveyByIdStub = (): LoadSurveyById => {
  class LoadSurveyResultStub implements LoadSurveyById {
    async loadById(id: string): Promise<SurveyModel | null> {
      return makeFakeSurvey()
    }
  }

  return new LoadSurveyResultStub()
}

type SutTypes = {
  sut: LoadSurveyResultController
  loadSurveyResultStub: LoadSurveyResult
  loadSurveyByIdStub: LoadSurveyById
}

const makeSut = (): SutTypes => {
  const loadSurveyResultStub = makeLoadSurveyResultStub()
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const sut = new LoadSurveyResultController(loadSurveyByIdStub, loadSurveyResultStub)
  return {
    sut,
    loadSurveyResultStub,
    loadSurveyByIdStub
  }
}

describe('LoadSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  beforeAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('Should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    const fakeSurveyResult = makeFakeSurveyResult()
    expect(httpResponse).toEqual(ok(fakeSurveyResult))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should return 500 if LoadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call LoadSurveyResult with correct value', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadByIdSpy = jest.spyOn(loadSurveyResultStub, 'loadBySurveyId')
    await sut.handle(makeFakeRequest())
    expect(loadByIdSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
  })

  test('Should return 500 if LoadSurveyResult throws', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    jest.spyOn(loadSurveyResultStub, 'loadBySurveyId').mockImplementationOnce(() => { throw new Error() })
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
