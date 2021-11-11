import { Middleware } from '../protocols/middleware'
import { HttpResponse } from '../protocols'
import { forbidden, ok, serverError } from '../helpers/http/http-helper'
import { AccessDeniedError } from '../errors'
import { LoadAccountByToken } from '../../domain/usecases/account/load-account-by-token'

export type AuthRequest = {
  accessToken?: string
}

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle(request: AuthRequest): Promise<HttpResponse> {
    try {
      if (request.accessToken) {
        const account = await this.loadAccountByToken.load(request.accessToken, this.role)

        if (account) {
          return ok({ accountId: account.id })
        }
      }

      return forbidden(new AccessDeniedError())
    } catch (error: any) {
      return serverError(error)
    }
  }
}
