/*
  Warnings:

  - You are about to drop the column `calories` on the `DiaryExercise` table. All the data in the column will be lost.
  - You are about to drop the column `time` on the `exercises` table. All the data in the column will be lost.
  - Added the required column `burned_calories` to the `DiaryExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiaryExercise" DROP COLUMN "calories",
ADD COLUMN     "burned_calories" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "exercises" DROP COLUMN "time",
ADD COLUMN     "duration" INTEGER NOT NULL DEFAULT 3;
