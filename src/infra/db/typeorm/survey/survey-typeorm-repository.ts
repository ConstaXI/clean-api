import { AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { LoadSurveysRepository } from '../../../../data/protocols/db/survey/load-surveys-repository'
import { LoadSurveyByIdRepository } from '../../../../data/protocols/db/survey/load-survey-by-id-repository'
import { AddSurveyModel } from '../../../../domain/usecases/survey/add-survey'
import { SurveyModel } from '../../../../domain/models/survey'
import TypeormHelper from '../helpers/typeorm-helper'
import SurveyEntity from '../entities/survey.entity'
import SurveyAnswerEntity from '../entities/surveyAnswer.entity'

export default class SurveyTypeormRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveyByIdRepository {
  async addSurvey (surveyData: AddSurveyModel): Promise<void> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const answers = surveyData.answers?.map(answer => {
      const newAnswer = new SurveyAnswerEntity()

      return Object.assign(newAnswer, answer) as SurveyAnswerEntity
    })

    await repository.save({
      ...surveyData,
      answers
    })
  }

  async loadAll (accountId: string): Promise<SurveyModel[] | null> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const surveys = await repository.find({ where: { accountId }, relations: ['surveyResults'] })

    return surveys.map(s => ({
      ...s,
      didAnswer: !!s.surveyResults.length
    }))
  }

  async loadById (id: string): Promise<SurveyModel> {
    const repository = await TypeormHelper.getRepository(SurveyEntity)

    const survey = await repository.findOneBy({ id })

    if (!survey) {
      throw new Error()
    }

    return survey
  }
}
