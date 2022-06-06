import env from '../../config/env'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LoginController } from '../../../presentation/controllers/login/login/login-controller'
import { DbAuthentication } from '../../../data/usecases/account/authentication/db-authentication'
import { makeLoginValidation } from '../controllers/login/login/login-validation-factory'
import { AccountTypeormRepository } from '../../../infra/db/typeorm/account/account-typeorm-repository'
import { LogTypeormRepository } from '../../../infra/db/typeorm/log/log-typeorm-repository'

export const makeLoginController = (): Controller => {
  const bcryptAdapter = new BcryptAdapter(12)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountTypeormRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bcryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogTypeormRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
