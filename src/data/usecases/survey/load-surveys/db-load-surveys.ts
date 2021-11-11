import { LoadSurveys } from '../../../../domain/usecases/survey/load-surveys'
import { SurveyModel } from '../../../../domain/models/survey'
import { LoadSurveysRepository } from '../../../protocols/db/survey/load-surveys-repository'

export class DbLoadSurveys implements LoadSurveys {
  constructor(
    private readonly loadSurveysRepository: LoadSurveysRepository
  ) {}

  async load(accountId: string): Promise<SurveyModel[] | null> {
    return await this.loadSurveysRepository.loadAll(accountId)
  }
}
