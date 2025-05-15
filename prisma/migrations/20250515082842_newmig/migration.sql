/*
  Warnings:

  - Made the column `email` on table `VerificationToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "email" SET NOT NULL,
ALTER COLUMN "type" SET DEFAULT 'EMAIL';
