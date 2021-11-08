import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
  LoadAccountByEmailRepository
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  constructor(
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async add(accountData: AddAccountModel): Promise<AccountModel | null> {
    const userAlreadyExists = await this.loadAccountByEmailRepository.loadByEmail(accountData.email)

    if (userAlreadyExists) return null

    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    return await this.addAccountRepository.addAccount(Object.assign({}, accountData, { password: hashedPassword }))
  }
}
