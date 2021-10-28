import { EmailValidation, RequiredFieldsValidation, ValidationComposite } from '../../../presentation/helpers/validators'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { Validation } from '../../../presentation/protocols/validation'
import { makeLoginValidation } from './login-validation'

jest.mock('../../../presentation/helpers/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

describe('MakeLoginValidation Factory', () => {
  test('Should call ValicationComposite with all validations', () => {
    makeLoginValidation()
    const validations: Validation[] = []

    const fields = ['email', 'password']
    fields.forEach(field => {
      validations.push(new RequiredFieldsValidation(field))
    })

    validations.push(new EmailValidation('email', makeEmailValidator()))

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
