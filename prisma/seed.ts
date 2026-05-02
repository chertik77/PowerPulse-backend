import type { Prisma } from 'generated/prisma/client'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'generated/prisma/client'

import exerciseFilters from './seeds/data/exercise-filters.json'
import exercises from './seeds/data/exercises.json'
import products from './seeds/data/products.json'

import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

const productsData: Prisma.ProductCreateInput[] = products
const exercisesData: Prisma.ExerciseCreateInput[] = exercises
const exerciseFiltersData: Prisma.ExerciseFilterCreateInput[] = exerciseFilters

const main = async () => {
  await prisma.product.createMany({
    data: productsData,
    skipDuplicates: true
  })

  await prisma.exerciseFilter.createMany({
    data: exerciseFiltersData,
    skipDuplicates: true
  })

  await prisma.exercise.createMany({
    data: exercisesData,
    skipDuplicates: true
  })
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
