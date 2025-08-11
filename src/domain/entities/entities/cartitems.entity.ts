import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Carts } from "./carts.entity";
import { Productvariants } from "./productvariants.entity";

@Index("cartitems_pkey", ["cartItemId"], { unique: true })
@Entity("cartitems", { schema: "public" })
export class Cartitems {
  @PrimaryGeneratedColumn({ type: "bigint", name: "cart_item_id" })
  cartItemId: string;

  @Column("integer", { name: "quantity", default: () => "1" })
  quantity: number;

  @Column("timestamp without time zone", {
    name: "added_at",
    default: () => "now()",
  })
  addedAt: Date;

  @ManyToOne(() => Carts, (carts) => carts.cartitems, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "cart_id", referencedColumnName: "cartId" }])
  cart: Carts;

  @ManyToOne(
    () => Productvariants,
    (productvariants) => productvariants.cartitems
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "variantId" }])
  variant: Productvariants;
}
