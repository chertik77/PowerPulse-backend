export const activityLevel = [1, 2, 3, 4, 5] as const
export const blood = [1, 2, 3, 4] as const
export const sex = ['male', 'female'] as const

export type ActivityLevel = (typeof activityLevel)[number]
export type Blood = (typeof blood)[number]
export type Sex = (typeof sex)[number]
