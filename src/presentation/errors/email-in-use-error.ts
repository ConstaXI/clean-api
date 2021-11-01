export class EmailInUseError extends Error {
  constructor() {
    super('Received emaiol is already in use')
    this.name = 'EmailInUseError'
  }
}
