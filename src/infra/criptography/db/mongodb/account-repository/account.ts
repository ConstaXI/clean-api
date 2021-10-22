import { AddAccountRepository } from '../../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../../domain/models/account'
import { AddAccountModel } from '../../../../../domain/usecases/add-account'
import MongoHelper from '../helpers/mongo-helper'

interface QueriedAccount extends AccountModel {
  _id: string
}

export class AccountMongoRepository implements AddAccountRepository {
  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne(result.insertedId) as QueriedAccount
    const { _id, ...rest } = account
    return Object.assign({}, rest, { id: account._id })
  }
}
