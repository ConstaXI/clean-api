import { Controller } from '../../../presentation/protocols'
import { LogControllerDecorator } from '../../decorators/log-controller-decorator'
import { LogTypeormRepository } from '../../../infra/db/typeorm/log/log-typeorm-repository'

export const makeLogControllerDecorator = (controller: Controller): Controller => {
  const logMongoRepository = new LogTypeormRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
