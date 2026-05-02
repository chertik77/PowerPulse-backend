export const EXERCISE_FILTER_TYPES = [
  'Body parts',
  'Muscles',
  'Equipment'
] as const

export type ExerciseFilterType = (typeof EXERCISE_FILTER_TYPES)[number]
