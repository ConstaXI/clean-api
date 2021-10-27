import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/criptography/bcrypt-adapter'
import SignUpController from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log'
import { Controller } from '../../presentation/protocols'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'
import { makeSignUpValidation } from './signup-validation'

export const makeSignUpController = (): Controller => {
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const bcryptAdater = new BcryptAdapter(12)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcryptAdater, accountMongoRepository)
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
