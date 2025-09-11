/*
  Warnings:

  - You are about to drop the column `s3Url` on the `Job` table. All the data in the column will be lost.
  - Added the required column `s3key` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Job" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL DEFAULT 'PENDING_UPLOAD',
    "name" TEXT NOT NULL,
    "s3key" TEXT NOT NULL,
    "transcriptionText" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Job" ("createdAt", "id", "name", "status", "transcriptionText", "updatedAt") SELECT "createdAt", "id", "name", "status", "transcriptionText", "updatedAt" FROM "Job";
DROP TABLE "Job";
ALTER TABLE "new_Job" RENAME TO "Job";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
