import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Colors } from "./colors.entity";
import { Productvariants } from "./productvariants.entity";

@Index("variantcolors_variant_id_color_id_key", ["colorId", "variantId"], {
  unique: true,
})
@Index("variantcolors_pkey", ["variantColorId"], { unique: true })
@Entity("variantcolors", { schema: "public" })
export class Variantcolors {
  @PrimaryGeneratedColumn({ type: "bigint", name: "variant_color_id" })
  variantColorId: string;

  @Column("bigint", { name: "variant_id", unique: true })
  variantId: string;

  @Column("integer", { name: "color_id", unique: true })
  colorId: number;

  @Column("boolean", { name: "is_primary", default: () => "true" })
  isPrimary: boolean;

  @ManyToOne(() => Colors, (colors) => colors.variantcolors)
  @JoinColumn([{ name: "color_id", referencedColumnName: "colorId" }])
  color: Colors;

  @ManyToOne(
    () => Productvariants,
    (productvariants) => productvariants.variantcolors,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "variantId" }])
  variant: Productvariants;
}
