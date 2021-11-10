import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { Authentication, Controller, HttpRequest, HttpResponse } from './login-controller-protocols'
import { Validation } from '../../../protocols'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)

      if (error) return badRequest(error)

      const { email, password } = httpRequest.body

      const auth = await this.authentication.auth({ email, password })

      if (!auth) {
        return unauthorized()
      }

      return ok(auth)
    } catch (error: any) {
      return serverError(error)
    }
  }
}
