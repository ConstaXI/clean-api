import { Controller } from '../../../../presentation/protocols'
import { SaveSurveyResultController } from '../../../../presentation/controllers/survey-result/save-survey-result/save-survey-result-controller'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'
import { makeDbLoadSurveyById } from '../../usecases/survey/db-load-survey-by-id'
import { makeDbSaveSurveyResult } from '../../usecases/survey-result/db-save-survey-result-factory'

export const makeSaveSurveyResultController = (): Controller => {
  const controller = new SaveSurveyResultController(makeDbLoadSurveyById(), makeDbSaveSurveyResult())
  return makeLogControllerDecorator(controller)
}
