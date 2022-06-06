import { Controller, HttpResponse, Validation } from '../../../protocols'
import { badRequest, noContent, serverError } from '../../../helpers/http/http-helper'
import { AddSurvey } from '../../../../domain/usecases/survey/add-survey'

type Answer = {
  answer: string
  image?: string
}

export type AddSurveyRequest = {
  accountId: string
  question: string
  answers: Answer[]
}

export class AddSurveyController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly addSurvey: AddSurvey
  ) {
  }

  async handle(request: AddSurveyRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      await this.addSurvey.add({
        ...request,
        date: new Date()
      })

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
