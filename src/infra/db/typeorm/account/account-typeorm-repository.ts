import { AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/account/load-account-by-email-repository'
import { LoadAccountByTokenRepository } from '../../../../data/protocols/db/account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '../../../../data/protocols/db/account/update-access-token-repository'
import { AddAccountModel } from '../../../../domain/usecases/account/add-account'
import { AccountModel } from '../../../../domain/models/account'
import TypeormHelper from '../helpers/typeorm-helper'
import AccountEntity from '../entities/account.entity'

export class AccountTypeormRepository implements AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository {
  async addAccount (accountData: AddAccountModel): Promise<AccountModel | null> {
    const repository = await TypeormHelper.getRepository(AccountEntity)

    const account = await repository.save(accountData)

    return account
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const repository = await TypeormHelper.getRepository(AccountEntity)

    return await repository.findOneBy({ email })
  }

  async update (id: string, token: string): Promise<void> {
    const repository = await TypeormHelper.getRepository(AccountEntity)

    await repository.save({
      id,
      accessToken: token
    })
  }

  async loadByToken (token: string): Promise<AccountModel | null> {
    const repository = await TypeormHelper.getRepository(AccountEntity)

    return await repository.findOneBy({ accessToken: token })
  }
}
