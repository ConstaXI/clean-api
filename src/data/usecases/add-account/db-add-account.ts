import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    await this.loadAccountByEmailRepository.load(accountData.email)
    const hashed_password = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashed_password }))
    return account
  }
}
