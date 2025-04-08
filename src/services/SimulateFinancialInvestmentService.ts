import { inject, injectable } from "inversify";
import { FinancialSimulation } from "../entities/FinancialSimulation";
import { ICreateFinancialSimulation } from "../dtos/FinancialSimulation/CreateFinancialSimulationDTO";
import { TYPES } from "../constants/types";
import { StudentsRepository } from "../contracts/StudentRepository";
import Decimal from "decimal.js";
import { FinancialSimulationsRepository } from "../contracts/FinancialSimulationsRepository";

interface IRequest
  extends Omit<ICreateFinancialSimulation, "installmentValue"> {}

@injectable()
export class SimulateFinancialInvestment {
  constructor(
    @inject(TYPES.StudentsRepository)
    private readonly studentsRepository: StudentsRepository,

    @inject(TYPES.FinancialSimulationsRepository)
    private readonly simulationsRepository: FinancialSimulationsRepository
  ) {}

  async execute({
    studentId,
    ...simulation
  }: IRequest): Promise<FinancialSimulation> {
    const student = await this.studentsRepository.findById(studentId);

    if (!student) {
      throw new Error("Student not found");
    }

    const installmentValue = this.calculateCompoundInterest(
      simulation.totalValue,
      simulation.interestRate,
      simulation.installmentCount
    );

    const financialSimulation = await this.simulationsRepository.create({
      ...simulation,
      installmentValue,
      studentId: student.id,
    });

    return financialSimulation;
  }

  /**
   * @description Math equation to calculate total value of the financial simulation in compound interest
   * PMT = PV * (i / (1 - (1 + i)^-n))
   * @param PV Total value
   * @param i Monthly interest
   * @param n Installments number
   * @returns PMT monthly installment value
   */
  private calculateCompoundInterest(
    PV: Decimal,
    i: Decimal,
    n: number
  ): Decimal {
    const One = new Decimal(1);

    const upper = PV.times(i);
    const lower = One.minus(Decimal.pow(One.plus(i), -n));

    return upper.dividedBy(lower);
  }
}
