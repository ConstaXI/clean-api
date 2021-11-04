import { AccountModel } from '../../../../domain/models/account'

export interface LoadAccountByTokenRepository {
  load: (token: string, role?: string) => Promise<AccountModel | null>
}
