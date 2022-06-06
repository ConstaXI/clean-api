import { LoadSurveyResult } from '../../../../domain/usecases/survey-result/load-survey-result'
import { DbLoadSurveyResult } from '../../../../data/usecases/survey-result/load-survey-result/db-load-survey-result'
import SurveyTypeormRepository from '../../../../infra/db/typeorm/survey/survey-typeorm-repository'
import {
  SurveyResultTypeormRepository
} from '../../../../infra/db/typeorm/surveyResult/survey-result-typeorm-repository'

export const makeDbLoadSurveyResult = (): LoadSurveyResult => {
  const surveyResultMongoRepository = new SurveyResultTypeormRepository()
  const surveyMongoRepository = new SurveyTypeormRepository()
  return new DbLoadSurveyResult(surveyResultMongoRepository, surveyMongoRepository)
}
