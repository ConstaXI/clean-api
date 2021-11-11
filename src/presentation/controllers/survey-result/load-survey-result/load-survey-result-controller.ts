import { Controller, HttpResponse } from '../../../protocols'
import { forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors'
import { LoadSurveyById } from '../../../../domain/usecases/survey/load-survey-by-id'
import { LoadSurveyResult } from '../../../../domain/usecases/survey-result/load-survey-result'

export type LoadSurveyResultRequest = {
  surveyId: string
  accountId: string
}

export class LoadSurveyResultController implements Controller {
  constructor(
    private readonly loadSurveyById: LoadSurveyById,
    private readonly loadSurveyResult: LoadSurveyResult
  ) {}

  async handle(request: LoadSurveyResultRequest): Promise<HttpResponse> {
    try {
      const survey = await this.loadSurveyById.loadById(request.surveyId)

      if (!survey) {
        return forbidden(new InvalidParamError('surveyId'))
      }

      const surveyResult = await this.loadSurveyResult.loadBySurveyId(request.surveyId, request.accountId)

      return ok(surveyResult)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
