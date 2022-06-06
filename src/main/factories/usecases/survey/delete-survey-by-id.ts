import SurveyTypeormRepository from '../../../../infra/db/typeorm/survey/survey-typeorm-repository'
import { DeleteSurveyById } from '../../../../domain/usecases/survey/delete-survey'
import { DbDeleteSurveyById } from '../../../../data/usecases/survey/delete-survey/db-delete-survey'

export const makeDbDeleteSurvey = (): DeleteSurveyById => {
  const surveyRepository = new SurveyTypeormRepository()
  return new DbDeleteSurveyById(surveyRepository)
}
