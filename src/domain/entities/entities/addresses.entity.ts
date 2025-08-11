import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./users.entity";
import { Orders } from "./orders.entity";

@Index("addresses_pkey", ["addressId"], { unique: true })
@Entity("addresses", { schema: "public" })
export class Addresses {
  @PrimaryGeneratedColumn({ type: "bigint", name: "address_id" })
  addressId: string;

  @Column("character varying", { name: "label", nullable: true, length: 50 })
  label: string | null;

  @Column("character varying", { name: "recipient", length: 100 })
  recipient: string;

  @Column("character varying", { name: "phone", length: 20 })
  phone: string;

  @Column("character varying", { name: "street", length: 255 })
  street: string;

  @Column("character varying", { name: "city", length: 100 })
  city: string;

  @Column("character varying", {
    name: "province",
    nullable: true,
    length: 100,
  })
  province: string | null;

  @Column("character varying", {
    name: "postal_code",
    nullable: true,
    length: 20,
  })
  postalCode: string | null;

  @Column("character varying", {
    name: "country",
    length: 100,
    default: () => "'Vietnam'",
  })
  country: string;

  @Column("boolean", { name: "is_default", default: () => "false" })
  isDefault: boolean;

  @ManyToOne(() => Users, (users) => users.addresses, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Orders, (orders) => orders.address)
  orders: Orders[];
}
