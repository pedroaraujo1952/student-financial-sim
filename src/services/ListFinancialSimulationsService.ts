import { inject, injectable } from "inversify";
import { TYPES } from "../constants/types";
import { FinancialSimulationsRepository } from "../contracts/FinancialSimulationsRepository";
import { IListFinancialSimulationDTO } from "../dtos/FinancialSimulation/ListFinancialSimulationDTO";
import { IPaginated } from "../contracts/Paginate";
import { FinancialSimulation } from "../entities/FinancialSimulation";

interface IRequest extends IListFinancialSimulationDTO {
  page?: number;
  limit?: number;
}

@injectable()
export class ListFinancialSimulationsService {
  constructor(
    @inject(TYPES.FinancialSimulationsRepository)
    private readonly simulationsRepository: FinancialSimulationsRepository
  ) {}

  async execute({
    limit,
    page = 1,
    ...args
  }: IRequest): Promise<IPaginated<FinancialSimulation>> {
    const skip = limit ? (page - 1) * limit : undefined;

    const { data, total } = await this.simulationsRepository.list(
      args,
      skip,
      limit
    );

    return {
      limit: limit ?? total,
      data,
      total,
    };
  }
}
