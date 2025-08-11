import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Index("suppliers_pkey", ["supplierId"], { unique: true })
@Entity("suppliers", { schema: "public" })
export class Suppliers {
  @PrimaryGeneratedColumn({ type: "integer", name: "supplier_id" })
  supplierId: number;

  @Column("character varying", { name: "name", length: 150 })
  name: string;

  @Column("character varying", {
    name: "contact_name",
    nullable: true,
    length: 100,
  })
  contactName: string | null;

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("character varying", { name: "email", nullable: true, length: 100 })
  email: string | null;

  @Column("character varying", { name: "address", nullable: true, length: 255 })
  address: string | null;

  @OneToMany(() => Products, (products) => products.supplier)
  products: Products[];
}
