-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "FinancialSimulation" (
    "id" TEXT NOT NULL,
    "studentId" INTEGER NOT NULL,
    "totalValue" DECIMAL(19,4) NOT NULL,
    "installmentCount" INTEGER NOT NULL,
    "interestRate" DECIMAL(5,4) NOT NULL,
    "installmentValue" DECIMAL(19,4) NOT NULL,

    CONSTRAINT "FinancialSimulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Student_email_key" ON "Student"("email");

-- AddForeignKey
ALTER TABLE "FinancialSimulation" ADD CONSTRAINT "FinancialSimulation_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
