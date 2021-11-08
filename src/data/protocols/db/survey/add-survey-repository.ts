import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'

export interface AddSurveyRepository {
  addSurvey: (surveyData: AddSurveyModel) => Promise<void>
}
