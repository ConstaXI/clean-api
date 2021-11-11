import { badRequest, ok, serverError, unauthorized } from '../../../helpers/http/http-helper'
import { Authentication, Controller, HttpResponse } from './login-controller-protocols'
import { Validation } from '../../../protocols'

export type LoginRequest = {
  email: string
  password: string
}

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle(request: LoginRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) return badRequest(error)

      const accessToken = await this.authentication.auth(request)

      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error: any) {
      return serverError(error)
    }
  }
}
