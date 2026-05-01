export const ACTIVITY_LEVEL = [1, 2, 3, 4, 5] as const

export type ActivityLevel = (typeof ACTIVITY_LEVEL)[number]
