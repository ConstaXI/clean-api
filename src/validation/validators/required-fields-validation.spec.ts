import { MissingParamError } from '../../presentation/errors'
import { RequiredFieldsValidation } from './required-fields-validation'

const makeSut = (): RequiredFieldsValidation => new RequiredFieldsValidation('field')

describe('RequiredFields Validation', () => {
  test('Should return a MissinParamError if validation fails', () => {
    const sut = makeSut()

    const error = sut.validate({ name: 'any_name' })

    expect(error).toEqual(new MissingParamError('field'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()

    const error = sut.validate({ field: 'any_field' })

    expect(error).toBeFalsy()
  })
})
