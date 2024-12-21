import type { ValidationArguments, ValidationOptions } from 'class-validator'

import { registerDecorator } from 'class-validator'

import { getAgeFromBirthDate } from 'utils'

export const IsMinimumAge =
  (minimumAge: number, validationOptions?: ValidationOptions) =>
  (object: object, propertyName: string) =>
    registerDecorator({
      propertyName,
      constraints: [minimumAge],
      target: object.constructor,
      options: validationOptions,
      validator: {
        validate(value: string, args: ValidationArguments) {
          const [minAge] = args.constraints

          const age = getAgeFromBirthDate(value)

          return age >= minAge
        },
        defaultMessage(args: ValidationArguments) {
          const [minAge] = args.constraints
          return `User must be at least ${minAge} years old.`
        }
      }
    })
