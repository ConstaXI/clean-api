import { AddSurveyModel } from '../../../../domain/usecases/add-survey'

export interface AddSurveyRepository {
  addSurvey: (surveyData: AddSurveyModel) => Promise<void>
}
