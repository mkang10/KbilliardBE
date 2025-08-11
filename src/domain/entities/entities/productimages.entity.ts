import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";

@Index("productimages_pkey", ["imageId"], { unique: true })
@Entity("productimages", { schema: "public" })
export class Productimages {
  @PrimaryGeneratedColumn({ type: "bigint", name: "image_id" })
  imageId: string;

  @Column("character varying", { name: "url", length: 500 })
  url: string;

  @Column("boolean", { name: "is_primary", default: () => "false" })
  isPrimary: boolean;

  @Column("integer", { name: "sort_order", default: () => "0" })
  sortOrder: number;

  @ManyToOne(() => Products, (products) => products.productimages, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;
}
