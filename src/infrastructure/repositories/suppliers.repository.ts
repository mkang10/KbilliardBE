import { Like, Repository } from 'typeorm';
import { Suppliers } from 'src/domain/entities/entities/suppliers.entity';
import { GenericRepository } from './generic.repository';
import type { ISuppliersRepository } from '../../domain/repositories/suppliers.repository.interface';

export class SuppliersRepository
  extends GenericRepository<Suppliers>
  implements ISuppliersRepository
{
  constructor(repo: Repository<Suppliers>) {
    super(repo);
  }

  async findByName(name: string): Promise<Suppliers[]> {
    return await this.repository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['products'],
    });
  }

  // override để thêm relations
  async findById(id: number): Promise<Suppliers | null> {
    return await this.repository.findOne({
      where: { supplierId: id },
      relations: ['products'],
    });
  }

  async findAll(): Promise<Suppliers[]> {
    return await this.repository.find({
      relations: ['products'],
      order: { supplierId: 'DESC' },
    });
  }
}
