import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AddAccount } from '../../../../../domain/usecases/account/add-account'
import { DbAddAccount } from '../../../../../data/usecases/account/add-account/db-add-account'
import { AccountTypeormRepository } from '../../../../../infra/db/typeorm/account/account-typeorm-repository'

export const makeDbAddAccount = (): AddAccount => {
  const bcryptAdapter = new BcryptAdapter(12)
  const accountRepository = new AccountTypeormRepository()
  return new DbAddAccount(bcryptAdapter, accountRepository, accountRepository)
}
