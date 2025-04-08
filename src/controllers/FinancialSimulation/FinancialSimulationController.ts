import { inject, injectable } from "inversify";
import { NextFunction, Request, Response } from "express";
import { TYPES } from "../../constants/types";
import { SimulateFinancialInvestment } from "../../services/SimulateFinancialInvestmentService";
import { ListFinancialSimulationsService } from "../../services/ListFinancialSimulationsService";
import { Decimal } from "@prisma/client/runtime/library";

@injectable()
export class FinancialSimulationController {
  constructor(
    @inject(TYPES.SimulateFinancialInvestmentService)
    private readonly simulateInvestment: SimulateFinancialInvestment,

    @inject(TYPES.ListFinancialSimulationsService)
    private readonly listSimulations: ListFinancialSimulationsService
  ) {}

  async create({ body, user }: Request, res: Response, next: NextFunction) {
    try {
      const investment = await this.simulateInvestment.execute({
        studentId: user!.id,
        installmentCount: body.installmentCount,
        interestRate: new Decimal(body.interestRate),
        totalValue: new Decimal(body.totalValue),
      });

      res.status(201).json(investment);
    } catch (err) {
      next(err);
    }
  }

  async list({ query, user }: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.listSimulations.execute({
        studentId: user!.id,

        // TODO: Sanitize query
        limit: query?.limit ? +query?.limit : undefined,
        page: query?.page ? +query?.page : undefined,
      });

      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
