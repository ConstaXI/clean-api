import { DeleteSurveyByIdRepository } from '../../../protocols/db/survey/delete-survey-repository'

export class DbDeleteSurveyById implements DeleteSurveyByIdRepository {
  constructor(
    private readonly deleteSurveyById: DeleteSurveyByIdRepository
  ) {}

  async delete(accountId: string): Promise<void> {
    await this.deleteSurveyById.delete(accountId)
  }
}
