/*
  Warnings:

  - You are about to drop the column `shortUrl` on the `Link` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Link` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Link" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "clicks" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Link" ("clicks", "createdAt", "id", "url") SELECT "clicks", "createdAt", "id", "url" FROM "Link";
DROP TABLE "Link";
ALTER TABLE "new_Link" RENAME TO "Link";
CREATE UNIQUE INDEX "Link_slug_key" ON "Link"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
