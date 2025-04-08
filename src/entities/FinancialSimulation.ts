import { Decimal } from "decimal.js";

export abstract class FinancialSimulation {
  constructor(
    public readonly id: string,
    public readonly studentId: number,
    public readonly installmentCount: number,
    public readonly totalValue: Decimal,
    public readonly interestRate: Decimal,
    public readonly installmentValue: Decimal
  ) {}
}
