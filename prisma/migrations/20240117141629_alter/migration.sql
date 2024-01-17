/*
  Warnings:

  - You are about to drop the column `validade_at` on the `check_ins` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "check_ins" DROP COLUMN "validade_at",
ADD COLUMN     "validaded_at" TIMESTAMP(3);
