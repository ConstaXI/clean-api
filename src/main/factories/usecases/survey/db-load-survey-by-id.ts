import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { DbLoadSurveyById } from '../../../../data/usecases/survey/load-survey-by-id/db-load-survey-by-id'
import SurveyTypeormRepository from '../../../../infra/db/typeorm/survey/survey-typeorm-repository'

export const makeDbLoadSurveyById = (): LoadSurveyById => {
  const surveyRepository = new SurveyTypeormRepository()
  return new DbLoadSurveyById(surveyRepository)
}
