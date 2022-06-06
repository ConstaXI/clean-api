import { Controller, HttpResponse } from '../../../protocols'
import { noContent, serverError } from '../../../helpers/http/http-helper'
import { DeleteSurveyById } from '../../../../domain/usecases/survey/delete-survey'

export type DeleteSurveyRequest = {
  surveyId: string
}

export class DeleteSurveyController implements Controller {
  constructor (
    private readonly deleteSurvey: DeleteSurveyById
  ) {
  }

  async handle (request: DeleteSurveyRequest): Promise<HttpResponse> {
    try {
      await this.deleteSurvey.delete(request.surveyId)

      return noContent()
    } catch (error: any) {
      return serverError(error)
    }
  }
}
