import { Validation } from './validation'

export class ValidationComposite implements Validation {
  constructor(private readonly validations: Validation[]) {}

  validate(input: any): Error | null {
    this.validations.forEach(validation => {
      const error = validation.validate(input)

      if (error) return error
    })

    return null
  }
}
