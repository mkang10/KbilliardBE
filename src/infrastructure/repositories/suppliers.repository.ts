import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Suppliers } from 'src/domain/entities/entities/suppliers.entity';
import type { ISuppliersRepository } from '../../domain/repositories/suppliers.repository.interface';

@Injectable()
export class SuppliersRepository implements ISuppliersRepository {
  constructor(
    @InjectRepository(Suppliers)
    private readonly suppliersRepo: Repository<Suppliers>,
  ) {}

  async create(supplier: Partial<Suppliers>): Promise<Suppliers> {
    const newSupplier = this.suppliersRepo.create(supplier);
    return await this.suppliersRepo.save(newSupplier);
  }

  async findAll(): Promise<Suppliers[]> {
    return await this.suppliersRepo.find({
      relations: ['products'],
      order: { supplierId: 'DESC' },
    });
  }

  async findById(id: number): Promise<Suppliers | null> {
    return await this.suppliersRepo.findOne({
      where: { supplierId: id },
      relations: ['products'],
    });
  }

  async findByName(name: string): Promise<Suppliers[]> {
    return await this.suppliersRepo.find({
      where: { name: Like(`%${name}%`) },
      relations: ['products'],
    });
  }

  async update(id: number, supplier: Partial<Suppliers>): Promise<Suppliers | null> {
    await this.suppliersRepo.update(id, supplier);
    return await this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.suppliersRepo.delete(id);
    return (result.affected ?? 0) > 0;
  }

  async count(): Promise<number> {
    return await this.suppliersRepo.count();
  }
}