import { Validation } from '../../../../../presentation/protocols'
import { makeAddSurveyValidation } from './add-survey-validation-factory'
import { RequiredFieldsValidation, ValidationComposite } from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []

    const fields = ['question', 'answers']
    fields.forEach(field => {
      validations.push(new RequiredFieldsValidation(field))
    })

    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
