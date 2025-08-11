import { Injectable, NotFoundException, BadRequestException, Inject } from '@nestjs/common';
import { SUPPLIERS_REPOSITORY_TOKEN, type ISuppliersRepository } from '../../domain/repositories/suppliers.repository.interface';
import type { CreateSupplierDto } from '../dtos/suppliers/create-supplier.dto';
import type { UpdateSupplierDto } from '../dtos/suppliers/update-supplier.dto';
import type { SupplierResponseDto } from '../dtos/suppliers/supplier-response.dto';

@Injectable()
export class SuppliersService {
 constructor(
    @Inject(SUPPLIERS_REPOSITORY_TOKEN)
    private readonly suppliersRepository: ISuppliersRepository,
  ) {}

  async create(createSupplierDto: CreateSupplierDto): Promise<SupplierResponseDto> {
    try {
      const supplier = await this.suppliersRepository.create(createSupplierDto);
      return this.toResponseDto(supplier);
    } catch (error) {
      throw new BadRequestException('Failed to create supplier');
    }
  }

  async findAll(): Promise<SupplierResponseDto[]> {
    const suppliers = await this.suppliersRepository.findAll();
    return suppliers.map(supplier => this.toResponseDto(supplier));
  }

  async findById(id: number): Promise<SupplierResponseDto> {
    const supplier = await this.suppliersRepository.findById(id);
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }
    return this.toResponseDto(supplier);
  }

  async findByName(name: string): Promise<SupplierResponseDto[]> {
    const suppliers = await this.suppliersRepository.findByName(name);
    return suppliers.map(supplier => this.toResponseDto(supplier));
  }

  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<SupplierResponseDto> {
    const existingSupplier = await this.suppliersRepository.findById(id);
    if (!existingSupplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    const updatedSupplier = await this.suppliersRepository.update(id, updateSupplierDto);
    return this.toResponseDto(updatedSupplier);
  }

  async delete(id: number): Promise<{ message: string }> {
    const existingSupplier = await this.suppliersRepository.findById(id);
    if (!existingSupplier) {
      throw new NotFoundException(`Supplier with ID ${id} not found`);
    }

    const deleted = await this.suppliersRepository.delete(id);
    if (!deleted) {
      throw new BadRequestException('Failed to delete supplier');
    }

    return { message: 'Supplier deleted successfully' };
  }

  async getStats(): Promise<{ total: number }> {
    const total = await this.suppliersRepository.count();
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