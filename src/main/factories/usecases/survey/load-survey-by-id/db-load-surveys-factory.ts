import { LoadSurveys } from '../../../../../domain/usecases/survey/load-surveys'
import { DbLoadSurveys } from '../../../../../data/usecases/survey/load-surveys/db-load-surveys'
import SurveyTypeormRepository from '../../../../../infra/db/typeorm/survey/survey-typeorm-repository'

export const makeDbLoadSurveys = (): LoadSurveys => {
  const surveyRepository = new SurveyTypeormRepository()
  return new DbLoadSurveys(surveyRepository)
}
