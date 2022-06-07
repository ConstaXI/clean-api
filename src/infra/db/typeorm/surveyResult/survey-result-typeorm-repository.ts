import { SaveSurveyResultRepository } from '../../../../data/protocols/db/survey-result/save-survey-result-repository'
import { SurveyResultModel } from '../../../../domain/models/survey-result'
import { SaveSurveyResultModel } from '../../../../domain/usecases/survey-result/save-survey-result'
import { LoadSurveyResultRepository } from '../../../../data/protocols/db/survey-result/load-survey-result-repository'
import TypeormHelper from '../helpers/typeorm-helper'
import SurveyResultEntity from '../entities/surveyResult.entity'
import SurveyEntity from '../entities/survey.entity'

export class SurveyResultTypeormRepository implements SaveSurveyResultRepository, LoadSurveyResultRepository {
  async save (data: SaveSurveyResultModel): Promise<void> {
    const repository = await TypeormHelper.getRepository(SurveyResultEntity)

    const alreadyExists = await repository.findOneBy({
      accountId: data.accountId,
      surveyId: data.surveyId
    })

    if (alreadyExists) {
      await repository.update(alreadyExists.id, data)
      return
    }

    await repository.save(data)
  }

  async loadBySurveyId (surveyId: string, accountId: string): Promise<SurveyResultModel> {
    const surveyResultRepository = await TypeormHelper.getRepository(SurveyResultEntity)
    const surveyRepository = await TypeormHelper.getRepository(SurveyEntity)

    const surveyResults = await surveyResultRepository.findBy({
      surveyId
    })

    const survey = await surveyRepository.findOne({
      where: {
        id: surveyId
      },
      relations: ['answers']
    })

    if (!surveyResults || !survey) {
      throw new Error('No survey')
    }

    return {
      surveyId,
      answers: survey.answers.map(a => ({
        ...a,
        count: surveyResults.filter(sr => sr.answer === a.answer).length,
        percent: surveyResults.filter(sr => sr.answer === a.answer).length / surveyResults.length,
        isCurrentAccountAnswered: surveyResults.some((sr) => sr.answer === a.answer && sr.accountId === accountId)
      })),
      question: survey.question,
      date: new Date()
    }
  }
}
