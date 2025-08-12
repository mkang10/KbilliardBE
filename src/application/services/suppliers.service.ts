import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
} from '@nestjs/common';
import type { CreateSupplierDto } from '../dtos/suppliers/create-supplier.dto';
import type { UpdateSupplierDto } from '../dtos/suppliers/update-supplier.dto';
import type { SupplierResponseDto } from '../dtos/suppliers/supplier-response.dto';
import type { IUnitOfWork } from 'src/domain/repositories/unitofwork.repository.interfaces';
import { UNIT_OF_WORK_TOKEN } from 'src/domain/repositories/unitofwork.repository.interfaces';

import { Suppliers } from 'src/domain/entities/entities/suppliers.entity';
import { TransactionalHandler } from 'src/shared/transactional.handler';
import { Like } from 'typeorm';
@Injectable()
export class SuppliersService {
  private readonly transactional: TransactionalHandler;
  constructor(
    @Inject(UNIT_OF_WORK_TOKEN)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async create(
    createSupplierDto: CreateSupplierDto,
  ): Promise<SupplierResponseDto> {
    const supplier = await this.transactional.run(async () => {
      const repo = this.unitOfWork.getRepository(Suppliers);
      return await repo.create(createSupplierDto);
    }, 'Failed to create supplier');

    return this.toResponseDto(supplier);
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const suppliers = await repo.findAll({
      relations: ['products'],
      order: { supplierId: 'DESC' },
    });
    return suppliers.map(this.toResponseDto);
  }

  async findById(id: number): Promise<SupplierResponseDto> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const supplier = await repo.findById(id, ['products']);
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return this.toResponseDto(supplier);
  }

  async findByName(name: string): Promise<SupplierResponseDto[]> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const suppliers = await repo.findByCondition({ name: Like(`%${name}%`) }, [
      'products',
    ]);
    return suppliers.map(this.toResponseDto);
  }

  async update(
    id: number,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<SupplierResponseDto> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const existing = await repo.findById(id, ['products']);
    if (!existing) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    const updated = await this.transactional.run(async () => {
      return await repo.update(id, updateSupplierDto);
    }, 'Failed to update supplier');

    return this.toResponseDto(updated);
  }

  async delete(id: number): Promise<{ message: string }> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const existing = await repo.findById(id);
    if (!existing) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    await this.transactional.run(async () => {
      const deleted = await repo.delete(id);
      if (!deleted) {
        throw new BadRequestException('Failed to delete supplier');
      }
    }, 'Failed to delete supplier');

    return { message: 'Supplier deleted successfully' };
  }

  async getStats(): Promise<{ total: number }> {
    const repo = this.unitOfWork.getRepository(Suppliers);
    const total = await repo.count();
    return { total };
  }

  private toResponseDto(supplier: any): SupplierResponseDto {
    return {
      supplierId: supplier.supplierId,
      name: supplier.name,
      contactName: supplier.contactName,
      phone: supplier.phone,
      email: supplier.email,
      address: supplier.address,
    };
  }
}
