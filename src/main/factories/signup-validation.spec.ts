import { RequiredFieldsValidation } from '../../presentation/helpers/validators/required-fields-validation'
import { ValidationComposite } from '../../presentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'
import { Validation } from '../../presentation/helpers/validators/validation'

jest.mock('../../presentation/helpers/validators/validation-composite')

describe('MakeSignUpValidation Factory', () => {
  test('Should call ValicationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: Validation[] = []

    const fields = ['name', 'email', 'password', 'passwordConfirmation']
    fields.forEach(field => {
      validations.push(new RequiredFieldsValidation(field))
    })

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
