import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors'
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { LoadSurveyResult } from '../../../../domain/usecases/survey-result/load-survey-result'

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { surveyId } = httpRequest.params

      const survey = await this.loadSurveyById.loadById(surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.loadSurveyResult.loadBySurveyId(surveyId)

      return ok(surveyResult)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
