import { LoadSurveyResult } from '../../../../domain/usecases/survey-result/load-survey-result'
import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/load-survey-result-repository'
import { LoadSurveyByIdRepository } from '../../../protocols/db/survey/load-survey-by-id-repository'

export class DbLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepository
  ) {}

  async loadBySurveyId(surveyId: string, accountId: string): Promise<SurveyResultModel> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, accountId)

    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)

      if (!survey) {
        throw new Error('Survey not found')
      }

      surveyResult = {
        surveyId: survey.id,
        question: survey.question,
        date: survey.date,
        answers: survey.answers.map(answer => Object.assign({}, answer, {
          count: 0,
          percent: 0,
          isCurrentAccountAnswered: false
        }))
      }

      return surveyResult
    }

    return surveyResult
  }
}
