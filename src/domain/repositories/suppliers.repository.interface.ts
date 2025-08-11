import { Suppliers } from "../entities/entities/suppliers.entity";

export interface ISuppliersRepository {
  create(supplier: Partial<Suppliers>): Promise<Suppliers>;
  findAll(): Promise<Suppliers[]>;
  findById(id: number): Promise<Suppliers | null>;
  findByName(name: string): Promise<Suppliers[]>;
  update(id: number, supplier: Partial<Suppliers>): Promise<Suppliers | null>;
  delete(id: number): Promise<boolean>;
  count(): Promise<number>;
}

export const SUPPLIERS_REPOSITORY_TOKEN = 'ISuppliersRepository';
