import Decimal from "decimal.js";

export interface ICreateFinancialSimulation {
  studentId: number;
  installmentCount: number;
  totalValue: Decimal;
  interestRate: Decimal;
  installmentValue: Decimal;
}
