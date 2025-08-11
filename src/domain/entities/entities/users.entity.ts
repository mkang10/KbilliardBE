import {
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Addresses } from "./addresses.entity";
import { Carts } from "./carts.entity";
import { Orders } from "./orders.entity";
import { Promoredemptions } from "./promoredemptions.entity";
import { Reviews } from "./Reviews.entity";

@Index("users_email_key", ["email"], { unique: true })
@Index("users_pkey", ["userId"], { unique: true })
@Entity("users", { schema: "public" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "user_id" })
  userId: string;

  @Column("character varying", { name: "email", unique: true, length: 255 })
  email: string;

  @Column("character varying", { name: "password_hash", length: 255 })
  passwordHash: string;

  @Column("character varying", { name: "full_name", length: 100 })
  fullName: string;

  @Column("character varying", { name: "phone", nullable: true, length: 20 })
  phone: string | null;

  @Column("enum", {
    name: "role",
    enum: ["customer", "admin", "staff"],
    default: () => "'customer'",
  })
  role: "customer" | "admin" | "staff";

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Addresses, (addresses) => addresses.user)
  addresses: Addresses[];

  @OneToOne(() => Carts, (carts) => carts.user)
  carts: Carts;

  @OneToMany(() => Orders, (orders) => orders.user)
  orders: Orders[];

  @OneToMany(
    () => Promoredemptions,
    (promoredemptions) => promoredemptions.user
  )
  promoredemptions: Promoredemptions[];

  @OneToMany(() => Reviews, (reviews) => reviews.user)
  reviews: Reviews[];
}
