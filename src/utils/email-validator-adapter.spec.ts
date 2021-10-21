import validator from 'validator'
import { EmailValidatorAdapter } from './email-validator-adapter'

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true
  }
}))

const makeSut = (): EmailValidatorAdapter => new EmailValidatorAdapter()

describe('EmailValidatorAdapter', () => {
  test('Should return false if validator returns false', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@mail.com')
    expect(isValid).toBe(false)
  })

  test('Should return true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  test('Should call validator with correct email', () => {
<<<<<<< HEAD
    const sut = makeSut()
=======
<<<<<<< HEAD:src/utils/email-validator-adapter.spec.ts
    const sut = makeSut()
=======
    const sut = new EmailValidatorAdapter()
>>>>>>> 1974b577a0007a8670d39411fc5d686987ba5c19:src/utils/mail-validator-adapter.spec.ts
>>>>>>> 7eecf13ce326ab02b5547ceae7ce73476cde7c10
    const isEmailSpy = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('any_email@mail.com')
  })
})
