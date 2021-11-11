import { EmailInUseError } from '../../../errors'
import { badRequest, forbidden, ok, serverError } from '../../../helpers/http/http-helper'
import { AddAccount, Authentication, Controller, HttpResponse, Validation } from './signup-controller-protocols'

export type SignUpRequest = {
  name: string
  email: string
  password: string
  passwordConfirmation: string
}

export default class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(request: SignUpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)

      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = request

      const account = await this.addAccount.add({
        name,
        email,
        password
      })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({
        email,
        password
      })

      return ok({ accessToken })
    } catch (error: any) {
      return serverError(error.stack)
    }
  }
}
