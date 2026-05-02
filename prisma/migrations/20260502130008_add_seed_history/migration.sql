-- CreateTable
CREATE TABLE "seed_history" (
    "id" TEXT NOT NULL,
    "executed_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "seed_history_pkey" PRIMARY KEY ("id")
);
