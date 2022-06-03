import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'
import * as MockDate from 'mockdate'
import { SurveyModel } from '../../../../domain/models/survey'
import TypeormHelper from '../helpers/typeorm-helper'
import { Repository } from 'typeorm'
import SurveyEntity from '../entities/survey.entity'
import SurveyTypeormRepository from './survey-typeorm-repository'
import AccountEntity from '../entities/account.entity'
import SurveyResultEntity from '../entities/surveyResult.entity'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'

const makeFakeSurveyData = (accountId: string): AddSurveyModel => ({
  question: 'any_question',
  accountId,
  answers: [{
    image: 'any_image',
    answer: 'any_answer'
  }, {
    answer: 'another_answer'
  }],
  date: new Date()
})

const makeFakeAccount = (): AddAccountModel => ({
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'hashed_password'
})

const makeSut = (): SurveyTypeormRepository => {
  return new SurveyTypeormRepository()
}

let surveyRepository: Repository<SurveyEntity>
let accountRepository: Repository<AccountEntity>
let surveyResultRepository: Repository<SurveyResultEntity>

describe('Account Typeorm Repository', () => {
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

  describe('addSurvey()', () => {
    test('Should add a survey on success', async () => {
      const sut = makeSut()
      const insertedAccount = await accountRepository.save(makeFakeAccount())
      await sut.addSurvey(makeFakeSurveyData(insertedAccount.id))
      const survey = await surveyRepository.findOneBy({ question: 'any_question' })
      expect(survey).toBeTruthy()
    })
  })

  describe('loadAll()', () => {
    test('Should load all surveys on success', async () => {
      const insertedAccount = await accountRepository.save(makeFakeAccount())
      const insertedSurveys = await surveyRepository.save([makeFakeSurveyData(insertedAccount.id), makeFakeSurveyData(insertedAccount.id)])
      await surveyResultRepository.save({
        surveyId: insertedSurveys[0].id,
        accountId: insertedAccount.id,
        answer: 'any_answer',
        date: new Date()
      })
      const sut = makeSut()
      const surveys = await sut.loadAll(insertedAccount.id) as SurveyModel[]
      expect(surveys?.length).toBe(2)
      expect(surveys[0].didAnswer).toBe(true)
      expect(surveys[1].didAnswer).toBe(false)
    })

    test('Should load empty list', async () => {
      const insertedAccount = await accountRepository.save(makeFakeAccount())
      const sut = makeSut()
      const surveys = await sut.loadAll(insertedAccount.id)
      expect(surveys?.length).toBe(0)
    })
  })

  describe('loadById()', () => {
    test('Should load survey by id on success', async () => {
      const insertedAccount = await accountRepository.save(makeFakeAccount())
      const insertResult = await surveyRepository.save(makeFakeSurveyData(insertedAccount.id))
      const sut = makeSut()
      const survey = await sut.loadById(insertResult.id)
      expect(survey).toBeTruthy()
      expect(survey?.id).toBeTruthy()
    })
  })
})
