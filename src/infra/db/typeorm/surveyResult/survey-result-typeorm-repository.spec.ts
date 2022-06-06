import * as MockDate from 'mockdate'
import TypeormHelper from '../helpers/typeorm-helper'
import SurveyEntity from '../entities/survey.entity'
import AccountEntity from '../entities/account.entity'
import SurveyResultEntity from '../entities/surveyResult.entity'
import { Repository } from 'typeorm'
import { SurveyResultTypeormRepository } from './survey-result-typeorm-repository'

const makeSut = (): SurveyResultTypeormRepository => {
  return new SurveyResultTypeormRepository()
}

let surveyRepository: Repository<SurveyEntity>
let accountRepository: Repository<AccountEntity>
let surveyResultRepository: Repository<SurveyResultEntity>

const makeFakeSurveyId = async (accountId: string): Promise<string> => {
  const result = await surveyRepository.save({
    question: 'any_question',
    accountId,
    answers: [{
      answer: 'any_answer'
    }, {
      answer: 'another_answer'
    }],
    date: new Date()
  })

  return result.id
}

const makeFakeAccountId = async (): Promise<string> => {
  const result = await accountRepository.save({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  return result.id
}

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    MockDate.set(new Date())
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    surveyRepository = await TypeormHelper.getRepository(SurveyEntity)
    accountRepository = await TypeormHelper.getRepository(AccountEntity)
    surveyResultRepository = await TypeormHelper.getRepository(SurveyResultEntity)
  })

  afterAll(async () => {
    MockDate.reset()
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId(accountId)

      await sut.save({
        surveyId: surveyId,
        accountId: accountId,
        answer: 'any_answer',
        date: new Date()
      })

      const surveyResult = await surveyResultRepository.findOneBy({
        surveyId,
        accountId
      })

      expect(surveyResult).toBeTruthy()
    })

    test('Should update a survey result if it already exists', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId(accountId)
      await surveyResultRepository.save({
        surveyId,
        accountId,
        answer: 'any_answer',
        date: new Date()
      })
      await sut.save({
        surveyId,
        accountId,
        answer: 'another_answer',
        date: new Date()
      })
      const surveyResult = await surveyResultRepository.findBy({
        surveyId,
        accountId
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load a survey result', async () => {
      const sut = makeSut()
      const accountId = await makeFakeAccountId()
      const surveyId = await makeFakeSurveyId(accountId)
      await surveyResultRepository.save([
        {
          surveyId,
          accountId,
          answer: 'any_answer',
          date: new Date()
        },
        {
          surveyId,
          accountId,
          answer: 'any_answer',
          date: new Date()
        },
        {
          surveyId,
          accountId,
          answer: 'another_answer',
          date: new Date()
        },
        {
          surveyId,
          accountId,
          answer: 'another_answer',
          date: new Date()
        },
        {
          surveyId,
          accountId,
          answer: 'another_answer',
          date: new Date()
        }
      ])
      const surveyResult = await sut.loadBySurveyId(surveyId, accountId)
      expect(surveyResult).toBeTruthy()
    })
  })
})
