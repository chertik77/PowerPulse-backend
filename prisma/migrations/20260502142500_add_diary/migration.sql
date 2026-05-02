-- CreateTable
CREATE TABLE "diary" (
    "id" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "diary_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryExercise" (
    "id" TEXT NOT NULL,
    "diary_id" TEXT NOT NULL,
    "exercise_id" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "DiaryExercise_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiaryProduct" (
    "id" TEXT NOT NULL,
    "diary_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "weight" INTEGER NOT NULL,
    "calories" INTEGER NOT NULL,

    CONSTRAINT "DiaryProduct_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "diary_userId_date_key" ON "diary"("userId", "date");

-- AddForeignKey
ALTER TABLE "diary" ADD CONSTRAINT "diary_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryExercise" ADD CONSTRAINT "DiaryExercise_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryExercise" ADD CONSTRAINT "DiaryExercise_exercise_id_fkey" FOREIGN KEY ("exercise_id") REFERENCES "exercises"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryProduct" ADD CONSTRAINT "DiaryProduct_diary_id_fkey" FOREIGN KEY ("diary_id") REFERENCES "diary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DiaryProduct" ADD CONSTRAINT "DiaryProduct_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
