-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL,
    "notifs" BOOLEAN NOT NULL,
    "themeColor" TEXT NOT NULL,
    "pfp" TEXT NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Settings" ADD CONSTRAINT "Settings_id_fkey" FOREIGN KEY ("id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
