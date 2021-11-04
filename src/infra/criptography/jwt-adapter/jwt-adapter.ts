import jwt from 'jsonwebtoken'
import { TokenGenerator } from '../../../data/protocols/criptograhy/token-generator'
import { Decrypter } from '../../../data/protocols/criptograhy/decrypter'

export class JwtAdapter implements TokenGenerator, Decrypter {
  constructor (private readonly secret: string) {}

  async generate(value: string): Promise<string> {
    return jwt.sign({ id: value }, this.secret)
  }

  async decrypt(token: string): Promise<string> {
    return jwt.verify(token, this.secret) as string
  }
}
