
import { Encrypter } from '../../../data/protocols/criptograhy/encrypter'
import bcrypt from 'bcrypt'
import { HashCompare } from '../../../data/protocols/criptograhy/hash-compare'

export class BcryptAdapter implements Encrypter, HashCompare {
  private readonly salt: number

  constructor(salt: number) {
    this.salt = salt
  }

  async encrypt(value: string): Promise<string> {
    return await bcrypt.hash(value, this.salt)
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(value, hash)
  }
}
