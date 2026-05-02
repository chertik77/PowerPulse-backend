-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "group_blood_not_allowed" JSONB NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
