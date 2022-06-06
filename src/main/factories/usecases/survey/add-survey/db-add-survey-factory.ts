import { AddSurvey } from '../../../../../domain/usecases/survey/add-survey'
import { DbAddSurvey } from '../../../../../data/usecases/survey/add-survey/db-add-survey'
import SurveyTypeormRepository from '../../../../../infra/db/typeorm/survey/survey-typeorm-repository'

export const makeDbAddSurvey = (): AddSurvey => {
  const surveyRepository = new SurveyTypeormRepository()
  return new DbAddSurvey(surveyRepository)
}
