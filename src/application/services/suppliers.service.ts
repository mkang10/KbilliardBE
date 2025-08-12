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
import { Like } from 'typeorm';

@Injectable()
export class SuppliersService {
  constructor(
    @Inject(UNIT_OF_WORK_TOKEN)
    private readonly unitOfWork: IUnitOfWork,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierResponseDto> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const supplier = await repo.create(createSupplierDto);
      await this.unitOfWork.complete();
      return this.toResponseDto(supplier);
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    } finally {
      await this.unitOfWork.release();
    }
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const suppliers = await repo.findAll({
        relations: ['products'],
        order: { supplierId: 'DESC' },
      });
      return suppliers.map(this.toResponseDto);
    } finally {
      await this.unitOfWork.release();
    }
  }

  async findById(id: number): Promise<SupplierResponseDto> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const supplier = await repo.findById(id, ['products']);
      if (!supplier) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }
      return this.toResponseDto(supplier);
    } finally {
      await this.unitOfWork.release();
    }
  }

  async findByName(name: string): Promise<SupplierResponseDto[]> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const suppliers = await repo.findByCondition({ name: Like(`%${name}%`) }, ['products']);
      return suppliers.map(this.toResponseDto);
    } finally {
      await this.unitOfWork.release();
    }
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierResponseDto> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const existing = await repo.findById(id, ['products']);
      if (!existing) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }
      const updated = await repo.update(id, updateSupplierDto);
      await this.unitOfWork.complete();
      return this.toResponseDto(updated);
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    } finally {
      await this.unitOfWork.release();
    }
  }

  async delete(id: number): Promise<{ message: string }> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const existing = await repo.findById(id);
      if (!existing) {
        throw new NotFoundException(`Supplier with ID ${id} not found`);
      }
      const deleted = await repo.delete(id);
      if (!deleted) {
        throw new BadRequestException('Failed to delete supplier');
      }
      await this.unitOfWork.complete();
      return { message: 'Supplier deleted successfully' };
    } catch (error) {
      await this.unitOfWork.rollback();
      throw error;
    } finally {
      await this.unitOfWork.release();
    }
  }

  async getStats(): Promise<{ total: number }> {
    await this.unitOfWork.start();
    try {
      const repo = this.unitOfWork.getRepository(Suppliers);
      const total = await repo.count();
      return { total };
    } finally {
      await this.unitOfWork.release();
    }
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
