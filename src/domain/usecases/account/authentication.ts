import { AuthenticationModel } from '../../models/authentication-model'

export type AuthenticationParams = {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel | null>
}
