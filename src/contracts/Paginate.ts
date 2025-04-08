export interface IPaginated<T> extends IFindAndCount<T> {
  limit: number;
}

export interface IFindAndCount<T> {
  data: T[];
  total: number;
}
