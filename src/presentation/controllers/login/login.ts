import { Controller, HttpRequest, HttpResponse } from '../../protocols'
import { badRequest, ok } from '../../helpers/http-helper'
import { MissingParamError } from '../../errors'
import { EmailValidator } from '../signup/signup-protocols'
import { InvalidParamError } from '../../errors/invalid-param-error'

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body

    if (!email) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('email'))))
    }

    if (!password) {
      return await new Promise((resolve) => resolve(badRequest(new MissingParamError('password'))))
    }

    const isValid = this.emailValidator.isValid(email)

    if (!isValid) {
      return await new Promise((resolve) => resolve(badRequest(new InvalidParamError('email'))))
    }

    return ok({ nice: 'nice' })
  }
}
