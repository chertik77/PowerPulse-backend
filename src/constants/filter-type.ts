export const FILTER_TYPE = ['Body parts', 'Muscles', 'Equipment'] as const

export type FilterType = (typeof FILTER_TYPE)[number]
