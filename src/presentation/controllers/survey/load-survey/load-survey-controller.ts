import { Controller, HttpResponse } from '../../../protocols'
import { LoadSurveys } from '../../../../domain/usecases/survey/load-surveys'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'

export type LoadSurveyRequest = {
  surveyId: string
  accountId: string
}

export class LoadSurveyController implements Controller {
  constructor(
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle(request: LoadSurveyRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load(request.accountId)

      if (surveys?.length) return ok(surveys)

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
