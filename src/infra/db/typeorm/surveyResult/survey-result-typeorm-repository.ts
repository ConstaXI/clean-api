import { SaveSurveyResultRepository } from '../../../../data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { SaveSurveyResultModel } from '../../../../domain/usecases/survey-result/save-survey-result'
import { LoadSurveyResultRepository } from '../../../../data/protocols/db/survey-result/load-survey-result-repository'
import TypeormHelper from '../helpers/typeorm-helper'
import SurveyResultEntity from '../entities/surveyResult.entity'

export class SurveyResultTypeormRepository implements SaveSurveyResultRepository, LoadSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<void> {
    const repository = await TypeormHelper.getRepository(SurveyResultEntity)

    const {
      surveyId,
      accountId,
      ...rest
    } = data

    await repository.update({
      surveyId,
      accountId
    }, rest)
  }

  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const repository = await TypeormHelper.getRepository(SurveyResultEntity)

    const surveyResult = await repository.createQueryBuilder('sr')
      .where('accountId = :accountId', { accountId })
      .andWhere('surveyId = :surveyId', { surveyId })
      .leftJoinAndSelect('answers', 's')
      .getOne()

    if (!surveyResult) {
      throw new Error('No survey')
    }

    return surveyResult
  }
}
