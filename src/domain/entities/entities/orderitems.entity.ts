import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders.entity";
import { Productvariants } from "./productvariants.entity";

@Index("orderitems_pkey", ["orderItemId"], { unique: true })
@Entity("orderitems", { schema: "public" })
export class Orderitems {
  @PrimaryGeneratedColumn({ type: "bigint", name: "order_item_id" })
  orderItemId: string;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("integer", { name: "unit_price_cents" })
  unitPriceCents: number;

  @Column("integer", { name: "subtotal_cents" })
  subtotalCents: number;

  @ManyToOne(() => Orders, (orders) => orders.orderitems, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @ManyToOne(
    () => Productvariants,
    (productvariants) => productvariants.orderitems
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "variantId" }])
  variant: Productvariants;
}
