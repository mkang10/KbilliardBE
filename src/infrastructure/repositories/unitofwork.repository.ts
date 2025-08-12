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
  private queryRunner: QueryRunner | null = null;

  constructor(@Inject(DataSource) private readonly dataSource: DataSource) {}

  async start(): Promise<void> {
    this.queryRunner = this.dataSource.createQueryRunner(); // ✅ tạo mới mỗi lần
    await this.queryRunner.connect();
    await this.queryRunner.startTransaction();
  }

  async complete(): Promise<void> {
    if (!this.queryRunner) throw new Error('QueryRunner not initialized');
    await this.queryRunner.commitTransaction();
  }

  async rollback(): Promise<void> {
    if (!this.queryRunner) throw new Error('QueryRunner not initialized');
    await this.queryRunner.rollbackTransaction();
  }

  async release(): Promise<void> {
    if (!this.queryRunner) return;
    await this.queryRunner.release();
    this.queryRunner = null; // ✅ reset để tránh reuse
  }

  getRepository<T extends ObjectLiteral>(entity: new () => T): GenericRepository<T> {
    if (!this.queryRunner) throw new Error('QueryRunner not initialized');
    const repo = this.queryRunner.manager.getRepository(entity);
    return new GenericRepository<T>(repo);
  }
}
