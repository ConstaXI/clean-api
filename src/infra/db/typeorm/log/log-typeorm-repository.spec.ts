import { LogTypeormRepository } from './log-typeorm-repository'
import { Repository } from 'typeorm'
import LogEntity from '../entities/log.entity'
import TypeormHelper from '../helpers/typeorm-helper'

const makeSut = (): LogTypeormRepository => new LogTypeormRepository()

let logRepository: Repository<LogEntity>

describe('Log Mongo Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    logRepository = await TypeormHelper.getRepository(LogEntity)
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  test('Should create an error log on success', async () => {
    const sut = makeSut()
    await sut.log('any_error')
    const count = await logRepository.count()
    expect(count).toBe(1)
  })
})
