import { LogMongoRepository } from '../../../../infra/db/mongodb/log/log-mongo-repository'
import SignUpController from '../../../../presentation/controllers/signup/signup-controller'
import { Controller } from '../../../../presentation/protocols'
import { LogControllerDecorator } from '../../../decorators/log-controller-decorator'
import { makeDbAuthentication } from '../../usecases/authentication/db-authentication-factory'
import { makeSignUpValidation } from './signup-validation-factory'
import { makeDbAddAccount } from '../../usecases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const signUpController = new SignUpController(makeDbAddAccount(), makeSignUpValidation(), makeDbAuthentication())
  const logMongoRepository = new LogMongoRepository()
  const controller = new LogControllerDecorator(signUpController, logMongoRepository)
  return makeLogControllerDecorator(controller)
}
