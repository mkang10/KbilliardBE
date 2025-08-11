import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Productimages } from "./productimages.entity";
import { Categories } from "./categories.entity";
import { Suppliers } from "./suppliers.entity";
import { Productvariants } from "./productvariants.entity";
import { Reviews } from "./Reviews.entity";

@Index("products_pkey", ["productId"], { unique: true })
@Index("products_sku_key", ["sku"], { unique: true })
@Entity("products", { schema: "public" })
export class Products {
  @PrimaryGeneratedColumn({ type: "bigint", name: "product_id" })
  productId: string;

  @Column("character varying", { name: "sku", unique: true, length: 50 })
  sku: string;

  @Column("character varying", { name: "name", length: 150 })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

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

  @OneToMany(() => Productimages, (productimages) => productimages.product)
  productimages: Productimages[];

  @ManyToOne(() => Categories, (categories) => categories.products)
  @JoinColumn([{ name: "category_id", referencedColumnName: "categoryId" }])
  category: Categories;

  @ManyToOne(() => Suppliers, (suppliers) => suppliers.products)
  @JoinColumn([{ name: "supplier_id", referencedColumnName: "supplierId" }])
  supplier: Suppliers;

  @OneToMany(
    () => Productvariants,
    (productvariants) => productvariants.product
  )
  productvariants: Productvariants[];

  @OneToMany(() => Reviews, (reviews) => reviews.product)
  reviews: Reviews[];
}
