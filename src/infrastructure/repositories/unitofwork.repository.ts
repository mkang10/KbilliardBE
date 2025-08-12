import {
  DataSource,
  QueryRunner,
  ObjectLiteral,
} from 'typeorm';
import { IUnitOfWork } from 'src/domain/repositories/unitofwork.repository.interfaces';
import { GenericRepository } from './generic.repository';
import { Inject, Injectable } from '@nestjs/common';
@Injectable()
export class UnitOfWork implements IUnitOfWork {
  private queryRunner: QueryRunner;

 constructor(@Inject(DataSource) private readonly dataSource: DataSource) {
    this.queryRunner = this.dataSource.createQueryRunner();
  }

  async start(): Promise<void> {
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(): Promise<void> {
    await this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    await this.queryRunner.rollbackTransaction();
  }

  async release(): Promise<void> {
    await this.queryRunner.release();
  }

  getRepository<T extends ObjectLiteral>(entity: new () => T): GenericRepository<T> {
  const repo = this.queryRunner.manager.getRepository(entity);
  return new GenericRepository<T>(repo);
}
}
