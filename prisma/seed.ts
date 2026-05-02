import { PrismaPg } from '@prisma/adapter-pg'
import { Prisma, PrismaClient } from 'generated/prisma/client'

import products from '../products.json'

import 'dotenv/config'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })

const prisma = new PrismaClient({ adapter })

const productsData: Prisma.ProductCreateInput[] = products

const main = async () => {
  for (const product of productsData) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {},
      create: product
    })
  }
}

main()
  .catch(console.error)
  .finally(async () => await prisma.$disconnect())
