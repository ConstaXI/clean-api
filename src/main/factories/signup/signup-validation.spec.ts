import { RequiredFieldsValidation } from '../../../presentation/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../../presentation/protocols/validation'
import { CompareFieldsValidation } from '../../../presentation/helpers/validators/compare-fields-validaton'
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

describe('MakeSignUpValidation Factory', () => {
  test('Should call ValicationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    const fields = ['name', 'email', 'password', 'passwordConfirmation']
    fields.forEach(field => {
      validations.push(new RequiredFieldsValidation(field))
    })
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
