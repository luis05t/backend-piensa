-- CreateTable
CREATE TABLE "VitalSigns" (
    "vitalSignId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "BPM" INTEGER,
    "temp" DOUBLE PRECISION,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "VitalSigns_pkey" PRIMARY KEY ("vitalSignId")
);

-- AddForeignKey
ALTER TABLE "VitalSigns" ADD CONSTRAINT "VitalSigns_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
