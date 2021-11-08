import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import { LoadSurveyController } from '../../../../../presentation/controllers/survey/load-survey/load-survey-controller'
import { makeDbLoadSurveys } from '../../../usecases/survey/load-survey-by-id/db-load-surveys-factory'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveyController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
