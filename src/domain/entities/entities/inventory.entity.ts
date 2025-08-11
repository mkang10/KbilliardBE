import { Column, Entity, Index, JoinColumn, OneToOne } from "typeorm";
import { Productvariants } from "./productvariants.entity";

@Index("inventory_pkey", ["variantId"], { unique: true })
@Entity("inventory", { schema: "public" })
export class Inventory {
  @Column("bigint", { primary: true, name: "variant_id" })
  variantId: string;

  @Column("integer", { name: "quantity", default: () => "0" })
  quantity: number;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToOne(
    () => Productvariants,
    (productvariants) => productvariants.inventory,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "variantId" }])
  variant: Productvariants;
}
