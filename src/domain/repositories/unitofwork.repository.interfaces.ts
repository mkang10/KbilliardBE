import { GenericRepository } from 'src/infrastructure/repositories/generic.repository';
import { Repository, ObjectLiteral } from 'typeorm';

export interface IUnitOfWork {
  start(): Promise<void>;
  complete(): Promise<void>;
  rollback(): Promise<void>;
  release(): Promise<void>;

  getRepository<T extends ObjectLiteral>(entity: new () => T): GenericRepository<T>;}
export const UNIT_OF_WORK_TOKEN = 'UNIT_OF_WORK_TOKEN';