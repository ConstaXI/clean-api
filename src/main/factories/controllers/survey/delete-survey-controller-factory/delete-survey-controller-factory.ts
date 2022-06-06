import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/log-controller-decorator-factory'
import {
  DeleteSurveyController
} from '../../../../../presentation/controllers/survey/delete-survey/delete-survey-controller'
import { makeDbDeleteSurvey } from '../../../usecases/survey/delete-survey-by-id'

export const makeDeleteSurveysController = (): Controller => {
  const controller = new DeleteSurveyController(makeDbDeleteSurvey())
  return makeLogControllerDecorator(controller)
}
