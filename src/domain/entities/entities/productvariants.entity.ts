import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cartitems } from "./cartitems.entity";
import { Inventory } from "./inventory.entity";
import { Orderitems } from "./orderitems.entity";
import { Products } from "./products.entity";
import { Variantcolors } from "./variantcolors.entity";
import { Variantthreads } from "./variantthreads.entity";

@Index("productvariants_sku_key", ["sku"], { unique: true })
@Index("productvariants_pkey", ["variantId"], { unique: true })
@Entity("productvariants", { schema: "public" })
export class Productvariants {
  @PrimaryGeneratedColumn({ type: "bigint", name: "variant_id" })
  variantId: string;

  @Column("character varying", { name: "sku", unique: true, length: 50 })
  sku: string;

  @Column("integer", { name: "extra_price_cents", default: () => "0" })
  extraPriceCents: number;

  @Column("integer", { name: "cost_cents", nullable: true })
  costCents: number | null;

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

  @OneToMany(() => Cartitems, (cartitems) => cartitems.variant)
  cartitems: Cartitems[];

  @OneToOne(() => Inventory, (inventory) => inventory.variant)
  inventory: Inventory;

  @OneToMany(() => Orderitems, (orderitems) => orderitems.variant)
  orderitems: Orderitems[];

  @ManyToOne(() => Products, (products) => products.productvariants, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;

  @OneToMany(() => Variantcolors, (variantcolors) => variantcolors.variant)
  variantcolors: Variantcolors[];

  @OneToMany(() => Variantthreads, (variantthreads) => variantthreads.variant)
  variantthreads: Variantthreads[];
}
