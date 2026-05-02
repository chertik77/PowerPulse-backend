import { Field, InputType } from '@nestjs/graphql'

import { IsString } from 'class-validator'

@InputType()
export class RemoveExerciseInput {
  @IsString()
  @Field()
  exerciseId: string

  @IsString()
  @Field()
  diaryId: string
}
