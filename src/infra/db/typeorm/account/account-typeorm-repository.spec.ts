import TypeormHelper from '../helpers/typeorm-helper'
import { Repository } from 'typeorm'
import AccountEntity from '../entities/account.entity'
import { AccountTypeormRepository } from './account-typeorm-repository'

let repository: Repository<AccountEntity>

describe('Account TypeOrm Repository', () => {
  beforeAll(async () => {
    await TypeormHelper.connect()
  })

  beforeEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.runMigrations()
    repository = await TypeormHelper.getRepository(AccountEntity)
  })

  afterAll(async () => {
    await TypeormHelper.disconnect()
  })

  afterEach(async () => {
    const dataSource = await TypeormHelper.getConnection()
    await dataSource.undoLastMigration()
  })

  const makeSut = (): AccountTypeormRepository => {
    return new AccountTypeormRepository()
  }

  describe('add()', () => {
    test('Should return an account on add success', async () => {
      const sut = makeSut()
      const account = await sut.addAccount({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an account on load success', async () => {
      const sut = makeSut()
      await repository.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      const account = await sut.loadByEmail('any_email@mail.com')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return null if load fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByEmail('i_do_not_exist@mail.com')
      expect(account).toBeFalsy()
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the account access token on update success', async () => {
      const sut = makeSut()
      const insertResult = await repository.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
      await sut.update(insertResult.id.toString(), 'any_token')
      const account = await repository.findOneBy({ id: insertResult.id })
      expect(account).toBeTruthy()
      expect(account?.accessToken).toBe('any_token')
    })
  })

  describe('loadByToken()', () => {
    test('Should return an account on loadByToken', async () => {
      const sut = makeSut()
      await repository.save({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password',
        accessToken: 'any_token'
      })
      const account = await sut.loadByToken('any_token')
      expect(account).toBeTruthy()
      expect(account?.id).toBeTruthy()
      expect(account?.name).toBe('any_name')
      expect(account?.email).toBe('any_email@mail.com')
      expect(account?.password).toBe('any_password')
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const account = await sut.loadByToken('non_existing_token')
      expect(account).toBeFalsy()
    })
  })
})
