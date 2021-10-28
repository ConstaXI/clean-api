import { RequiredFieldsValidation } from '../../../presentation/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeLoginValidation } from './login-validation'
import { Validation } from '../../../presentation/helpers/validators/validation'
import { EmailValidator } from '../../../presentation/protocols/email-validator'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation'

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
