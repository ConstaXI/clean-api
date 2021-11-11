import { Controller, HttpResponse } from '../../../protocols'
import { forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '../../../errors'
import { SaveSurveyResult } from '../../../../domain/usecases/survey-result/save-survey-result'

export type SaveSurveyResultRequest = {
  surveyId: string
  answer: string
  accountId: string
}

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(request: SaveSurveyResultRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(request.surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)

        if (!answers.includes(request.answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.saveSurveyResult.save({
        ...request,
        date: new Date()
      })

      return ok(surveyResult)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
