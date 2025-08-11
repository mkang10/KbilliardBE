import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promoredemptions } from "./promoredemptions.entity";

@Index("promocodes_code_key", ["code"], { unique: true })
@Index("promocodes_pkey", ["codeId"], { unique: true })
@Entity("promocodes", { schema: "public" })
export class Promocodes {
  @PrimaryGeneratedColumn({ type: "bigint", name: "code_id" })
  codeId: string;

  @Column("character varying", { name: "code", unique: true, length: 50 })
  code: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @Column("enum", { name: "discount_type", enum: ["percent", "fixed"] })
  discountType: "percent" | "fixed";

  @Column("integer", { name: "discount_value" })
  discountValue: number;

  @Column("integer", {
    name: "min_order_cents",
    nullable: true,
    default: () => "0",
  })
  minOrderCents: number | null;

  @Column("integer", { name: "max_uses", nullable: true })
  maxUses: number | null;

  @Column("timestamp without time zone", { name: "expires_at", nullable: true })
  expiresAt: Date | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @OneToMany(
    () => Promoredemptions,
    (promoredemptions) => promoredemptions.code
  )
  promoredemptions: Promoredemptions[];
}
