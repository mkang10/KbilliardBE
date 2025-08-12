import {
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export interface IGenericRepository<T> {
  create(entity: DeepPartial<T>): Promise<T>;
  findAll(options?: FindManyOptions<T>): Promise<T[]>;
  findById(id: number, relations?: string[]): Promise<T | null>;
  update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T | null>;
  delete(id: number): Promise<boolean>;
  count(): Promise<number>;
  findByCondition(condition: FindOptionsWhere<T>, relations?: string[]): Promise<T[]>;
}
