import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add-account'

export interface AddAccountRepository {
  addAccount: (accountData: AddAccountModel) => Promise<AccountModel | null>
}
