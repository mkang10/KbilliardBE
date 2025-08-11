import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Products } from "./products.entity";
import { Users } from "./users.entity";

@Index("reviews_user_id_product_id_key", ["productId", "userId"], {
  unique: true,
})
@Index("reviews_pkey", ["reviewId"], { unique: true })
@Entity("reviews", { schema: "public" })
export class Reviews {
  @PrimaryGeneratedColumn({ type: "bigint", name: "review_id" })
  reviewId: string;

  @Column("bigint", { name: "user_id", unique: true })
  userId: string;

  @Column("bigint", { name: "product_id", unique: true })
  productId: string;

  @Column("smallint", { name: "rating" })
  rating: number;

  @Column("character varying", { name: "title", nullable: true, length: 150 })
  title: string | null;

  @Column("text", { name: "content", nullable: true })
  content: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt: Date;

  @ManyToOne(() => Products, (products) => products.reviews)
  @JoinColumn([{ name: "product_id", referencedColumnName: "productId" }])
  product: Products;

  @ManyToOne(() => Users, (users) => users.reviews)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
