import { RequiredFieldsValidation, ValidationComposite } from '../../../../../validation/validators'
import { Validation } from '../../../../../presentation/protocols'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  const fields = ['question', 'answers']

  fields.forEach(field => {
    validations.push(new RequiredFieldsValidation(field))
  })

  return new ValidationComposite(validations)
}
