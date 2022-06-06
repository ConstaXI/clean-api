import { SaveSurveyResult } from '../../../../domain/usecases/survey-result/save-survey-result'
import { DbSaveSurveyResult } from '../../../../data/usecases/survey-result/save-survey-result/db-save-survey-result'
import {
  SurveyResultTypeormRepository
} from '../../../../infra/db/typeorm/surveyResult/survey-result-typeorm-repository'

export const makeDbSaveSurveyResult = (): SaveSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultTypeormRepository()
  return new DbSaveSurveyResult(surveyResultMongoRepository, surveyResultMongoRepository)
}
