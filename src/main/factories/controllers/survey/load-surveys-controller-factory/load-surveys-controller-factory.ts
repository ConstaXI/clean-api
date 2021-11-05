import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveyController } from '../../../../../presentation/controllers/load-survey/load-survey-controller'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-surveys/db-load-surveys'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveyController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
