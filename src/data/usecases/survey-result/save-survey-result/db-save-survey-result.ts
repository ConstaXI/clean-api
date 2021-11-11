import { SaveSurveyResult, SaveSurveyResultModel } from '../../../../domain/usecases/survey-result/save-survey-result'
import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { SaveSurveyResultRepository } from '../../../protocols/db/survey-result/save-survey-result-repository'
import { LoadSurveyResultRepository } from '../../../protocols/db/survey-result/load-survey-result-repository'

export class DbSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly saveSurveyResultRepository: SaveSurveyResultRepository,
    private readonly loadSurveyResultRepository: LoadSurveyResultRepository
  ) {}

  async save(data: SaveSurveyResultModel): Promise<SurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return await this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
  }
}
