import env from '../../../../config/env'
import { DbAuthentication } from '../../../../../data/usecases/account/authentication/db-authentication'
import { BcryptAdapter } from '../../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Authentication } from '../../../../../domain/usecases/account/authentication'
import { AccountTypeormRepository } from '../../../../../infra/db/typeorm/account/account-typeorm-repository'

export const makeDbAuthentication = (): Authentication => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountTypeormRepository()
  return new DbAuthentication(accountRepository, bcryptAdapter, jwtAdapter, accountRepository)
}
