import { Controller, HttpRequest, HttpResponse } from '../../../protocols'
import { LoadSurveys } from '../../../../domain/usecases/survey/load-surveys'
import { forbidden, noContent, ok, serverError } from '../../../helpers/http/http-helper'
import { InvalidParamError } from '../../../errors'

export class LoadSurveyController implements Controller {
  constructor(
    private readonly loadSurveys: LoadSurveys
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.accountId) return forbidden(new InvalidParamError('accountId'))

      const surveys = await this.loadSurveys.load(httpRequest.accountId)

      if (surveys?.length) return ok(surveys)

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
