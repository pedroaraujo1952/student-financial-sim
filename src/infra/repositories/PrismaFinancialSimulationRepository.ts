import { FinancialSimulation, Prisma, PrismaClient } from "@prisma/client";
import { injectable } from "inversify";
import { FinancialSimulationsRepository } from "../../contracts/FinancialSimulationsRepository";
import { IFindAndCount } from "../../contracts/Paginate";

import { v4 } from "uuid";

@injectable()
export class PrismaFinancialSimulationsRepository
  implements FinancialSimulationsRepository
{
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(
    data: Prisma.FinancialSimulationCreateInput
  ): Promise<FinancialSimulation> {
    // TODO: Create UUID Server Side
    return await this.prisma.financialSimulation.create({
      data: { ...data, id: v4() },
    });
  }

  async list(
    data: Prisma.FinancialSimulationWhereInput,
    skip?: number,
    take?: number
  ): Promise<IFindAndCount<FinancialSimulation>> {
    const [simulations, total] = await this.prisma.$transaction([
      this.prisma.financialSimulation.findMany({
        where: data,
        skip,
        take,
      }),
      this.prisma.financialSimulation.count({ where: data }),
    ]);

    return {
      data: simulations,
      total,
    };
  }
}
