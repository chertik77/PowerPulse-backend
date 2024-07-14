import type { ValidatorConstraintInterface } from 'class-validator'

import { ValidatorConstraint } from 'class-validator'
import { getAge } from 'helpers'

import { MINIMUM_AGE_REQUIRED } from 'schemas'

@ValidatorConstraint({ async: false })
export class Is16YearsOld implements ValidatorConstraintInterface {
  validate(birthday: string) {
    return getAge(birthday) >= MINIMUM_AGE_REQUIRED
  }

  defaultMessage() {
    return 'User must be at least 16 years old'
  }
}
