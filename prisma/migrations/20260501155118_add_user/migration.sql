-- CreateEnum
CREATE TYPE "Blood" AS ENUM ('A', 'B', 'AB', 'O');

-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('male', 'female');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "height" INTEGER,
    "current_weight" INTEGER,
    "desired_weight" INTEGER,
    "birthday" TIMESTAMP(3),
    "sex" "Sex",
    "blood" "Blood",
    "is_daily_intake_form_completed" BOOLEAN NOT NULL DEFAULT false,
    "activity_level" INTEGER,
    "daily_calorie_intake" INTEGER,
    "daily_exercise_time" INTEGER DEFAULT 110,
    "avatar" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
