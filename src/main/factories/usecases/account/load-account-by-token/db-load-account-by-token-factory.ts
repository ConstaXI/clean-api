import { LoadAccountByToken } from '../../../../../domain/usecases/account/load-account-by-token'
import { DbLoadAccountByToken } from '../../../../../data/usecases/account/load-account-by-token/db-load-account-by-token'
import { JwtAdapter } from '../../../../../infra/criptography/jwt-adapter/jwt-adapter'
import env from '../../../../config/env'
import { AccountTypeormRepository } from '../../../../../infra/db/typeorm/account/account-typeorm-repository'

export const makeDbLoadAccountByToken = (): LoadAccountByToken => {
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountRepository = new AccountTypeormRepository()
  return new DbLoadAccountByToken(jwtAdapter, accountRepository)
}
