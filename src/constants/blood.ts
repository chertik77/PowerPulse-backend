export const BLOOD = [1, 2, 3, 4] as const

export type Blood = (typeof BLOOD)[number]
