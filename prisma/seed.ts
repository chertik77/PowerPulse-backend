import type { Prisma } from 'generated/prisma/client'

import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from 'generated/prisma/client'

import exerciseFilters from './seeds/data/exercise-filters.json'
import exercises from './seeds/data/exercises.json'
import products from './seeds/data/products.json'

import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

const hasSeedRun = async (id: string) => {
  const seedHasRun = await prisma.seedHistory.findUnique({
    where: { id }
  })

  return !!seedHasRun
}

const markSeedAsRun = async (id: string) => {
  await prisma.seedHistory.create({
    data: { id }
  })
}

const productsData: Prisma.ProductCreateInput[] = products
const exercisesData: Prisma.ExerciseCreateInput[] = exercises
const exerciseFiltersData: Prisma.ExerciseFilterCreateInput[] = exerciseFilters

const main = async () => {
  if (!(await hasSeedRun('001-products'))) {
    await prisma.product.createMany({
      data: productsData,
      skipDuplicates: true
    })

    await markSeedAsRun('001-products')
  }

  if (!(await hasSeedRun('002-exercise-filters'))) {
    await prisma.exerciseFilter.createMany({
      data: exerciseFiltersData,
      skipDuplicates: true
    })

    await markSeedAsRun('002-exercise-filters')
  }

  if (!(await hasSeedRun('003-exercises'))) {
    await prisma.exercise.createMany({
      data: exercisesData,
      skipDuplicates: true
    })

    await markSeedAsRun('003-exercises')
  }
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
