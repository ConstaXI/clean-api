import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    if (!httpRequest.body.email) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))))
    } else if (!httpRequest.body.password) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))))
    }

    return ok({ nice: 'nice' })
  }
}
