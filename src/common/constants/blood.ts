export const RECOMMENDED_BY_BLOOD = [
  'All',
  'Recommended',
  'Not Recommended'
] as const

export type RecommendedByBlood = (typeof RECOMMENDED_BY_BLOOD)[number]
