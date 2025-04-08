import { IListFinancialSimulationDTO } from "../dtos/FinancialSimulation/ListFinancialSimulationDTO";
import { FinancialSimulation } from "../entities/FinancialSimulation";
import { IFindAndCount } from "./Paginate";

export abstract class FinancialSimulationsRepository {
  abstract list(
    data: IListFinancialSimulationDTO,
    skip?: number,
    take?: number
  ): Promise<IFindAndCount<FinancialSimulation>>;
  abstract create(data): Promise<FinancialSimulation>;
}
