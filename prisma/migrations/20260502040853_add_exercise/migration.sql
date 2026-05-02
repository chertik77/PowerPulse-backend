-- CreateTable
CREATE TABLE "exercises" (
    "id" TEXT NOT NULL,
    "body_part" TEXT NOT NULL,
    "burned_calories" INTEGER NOT NULL,
    "equipment" TEXT NOT NULL,
    "gif_url" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "time" INTEGER NOT NULL DEFAULT 3,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);
