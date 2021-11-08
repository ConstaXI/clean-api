import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadSurveys } from '../../../../domain/usecases/survey/load-surveys'
import { noContent, ok, serverError } from '../../../helpers/http/http-helper'

export class LoadSurveyController implements Controller {
  constructor(
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()

      if (surveys?.length) return ok(surveys)

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
