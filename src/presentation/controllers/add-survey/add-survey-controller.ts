import { Controller, HttpRequest, HttpResponse, Validation } from '../../protocols'
import { badRequest, noContent, serverError } from '../../helpers/http/http-helper'
import { AddSurvey } from '../../../domain/usecases/add-survey'

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
  }

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      const { question, answers } = httpRequest.body

      await this.addSurvey.add({
        question,
        answers,
        date: new Date()
      })

      if (error) {
        return badRequest(error)
      }

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
