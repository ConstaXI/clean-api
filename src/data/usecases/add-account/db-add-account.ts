import { AccountModel, AddAccount, AddAccountModel, AddAccountRepository, Encrypter, LoadAccountByEmailRepository } from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository?: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    const userAlreadyExists = await this.loadAccountByEmailRepository?.load(accountData.email)

    if (!userAlreadyExists) {
      const hashedPassword = await this.encrypter.encrypt(accountData.password)
      const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
      return account
    }

    return null
  }
}
