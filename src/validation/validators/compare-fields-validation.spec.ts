import { CompareFieldsValidation } from './compare-fields-validaton'
import { InvalidParamError } from '../../presentation/errors'

const makeSut = (): CompareFieldsValidation => new CompareFieldsValidation('field', 'fieldToCompare')

describe('CompareFields Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'other_value'
    })

    expect(error).toEqual(new InvalidParamError('fieldToCompare'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({
      field: 'any_field',
      fieldToCompare: 'any_field'
    })

    expect(error).toBeFalsy()
  })
})
