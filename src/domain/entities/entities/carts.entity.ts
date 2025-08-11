import {
  Column,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Cartitems } from "./cartitems.entity";
import { Users } from "./users.entity";

@Index("carts_pkey", ["cartId"], { unique: true })
@Index("carts_user_id_key", ["userId"], { unique: true })
@Entity("carts", { schema: "public" })
export class Carts {
  @PrimaryGeneratedColumn({ type: "bigint", name: "cart_id" })
  cartId: string;

  @Column("bigint", { name: "user_id", unique: true })
  userId: string;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Cartitems, (cartitems) => cartitems.cart)
  cartitems: Cartitems[];

  @OneToOne(() => Users, (users) => users.carts, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
