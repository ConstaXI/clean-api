import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { InvalidParamError } from '../../../errors'
import { SaveSurveyResult } from '../../../../domain/usecases/survey-result/save-survey-result'

export class SaveSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly saveSurveyResult: SaveSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params
      const { answer } = httpRequest.body
      const { accountId } = httpRequest

      if (!accountId) return forbidden(new InvalidParamError('accountId'))

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (survey) {
        const answers = survey.answers.map(a => a.answer)

        if (!answers.includes(answer)) {
          return forbidden(new InvalidParamError('answer'))
        }
      } else {
        return forbidden(new InvalidParamError('surveyId'))
      }

      await this.saveSurveyResult.save({
        accountId,
        surveyId,
        answer,
        date: new Date()
      })

      return ok(survey)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
