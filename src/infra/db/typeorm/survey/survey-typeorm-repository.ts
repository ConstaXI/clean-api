import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/survey/load-survey-by-id-repository'
import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'
import { SurveyModel } from '../../../../domain/models/survey'
import TypeormHelper from '../helpers/typeorm-helper'
import SurveyEntity from '../entities/survey.entity'
import SurveyAnswerEntity from '../entities/surveyAnswer.entity'
import { DeleteSurveyByIdRepository } from '../../../../data/protocols/db/survey/delete-survey-repository'

export default class SurveyTypeormRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository, DeleteSurveyByIdRepository {
  async addSurvey (surveyData: AddSurveyModel): Promise<void> {
    const surveyRepository = await TypeormHelper.getRepository(SurveyEntity)
    const answerRepository = await TypeormHelper.getRepository(SurveyAnswerEntity)

    const survey = await surveyRepository.save(surveyData)

    await Promise.all(
      surveyData.answers.map(async answer => await answerRepository.save({ ...answer, surveyId: survey.id }))
    )
  }

  async loadAll (accountId: string): Promise<SurveyModel[] | null> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const surveys = await repository.find({ relations: ['surveyResults', 'account'] })

    return surveys.map(s => ({
      ...s,
      didAnswer: s.surveyResults.some(sr => sr.accountId === accountId)
    }))
  }

  async loadById (id: string): Promise<SurveyModel> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const survey = await repository.findOne({ where: { id }, relations: ['answers'] })

    if (!survey) {
      throw new Error('survey not found')
    }

    return survey
  }

  async delete (id: string): Promise<void> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const survey = await repository.findOne({ where: { id }, relations: ['answers'] })

    if (!survey) {
      throw new Error('Survey not found')
    }

    await repository.remove(survey)
  }
}
