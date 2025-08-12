import {
  Repository,
  ObjectLiteral,
  DeepPartial,
  FindOptionsWhere,
  FindManyOptions,
} from 'typeorm';
import { IGenericRepository } from 'src/domain/repositories/generic.repository.interface';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity.js';

export class GenericRepository<T extends ObjectLiteral> implements IGenericRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(entity: DeepPartial<T>): Promise<T> {
    const newEntity = this.repository.create(entity);
    return await this.repository.save(newEntity);
  }

  async findAll(options?: FindManyOptions<T>): Promise<T[]> {
    return await this.repository.find(options);
  }

 async findById(id: number, relations: string[] = []): Promise<T | null> {
  return await this.repository.findOne({
    where: { id } as unknown as FindOptionsWhere<T>,
    relations,
  });
}

  async update(id: number, entity: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, entity);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.repository.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(): Promise<number> {
    return await this.repository.count();
  }

  async findByCondition(condition: FindOptionsWhere<T>, relations: string[] = []): Promise<T[]> {
    return await this.repository.find({
      where: condition,
      relations,
    });
  }
}
