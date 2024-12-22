import { applyDecorators } from '@nestjs/common'

import { registerDecorator, ValidationArguments } from 'class-validator'

// eslint-disable-next-line @typescript-eslint/ban-types
export const OneOf = (properties: string[]) => (target: Function) => {
  applyDecorators(OneOfChecker(properties))(target.prototype)
}

const OneOfChecker =
  (properties: string[]) => (object: object, propertyName: string | symbol) => {
    registerDecorator({
      constraints: [properties],
      target: object.constructor,
      propertyName: String(propertyName),
      validator: {
        validate(_: unknown, args: ValidationArguments) {
          const object = args.object as Record<string, unknown>
          const properties = args.constraints[0] as string[]

          const nonEmptyFields = properties.filter(
            p => object[p] !== undefined && object[p] !== null
          )

          return nonEmptyFields.length <= 1
        },

        defaultMessage(args: ValidationArguments) {
          const [properties] = args.constraints as [string[]]

          return `Only one of ${properties.join(', ')} can be defined at time.`
        }
      }
    })
  }
