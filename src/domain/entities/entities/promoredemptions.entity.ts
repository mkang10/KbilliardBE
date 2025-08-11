import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promocodes } from "./promocodes.entity";
import { Orders } from "./orders.entity";
import { Users } from "./users.entity";

@Index("promoredemptions_pkey", ["redemptionId"], { unique: true })
@Entity("promoredemptions", { schema: "public" })
export class Promoredemptions {
  @PrimaryGeneratedColumn({ type: "bigint", name: "redemption_id" })
  redemptionId: string;

  @Column("timestamp without time zone", {
    name: "redeemed_at",
    default: () => "now()",
  })
  redeemedAt: Date;

  @ManyToOne(() => Promocodes, (promocodes) => promocodes.promoredemptions)
  @JoinColumn([{ name: "code_id", referencedColumnName: "codeId" }])
  code: Promocodes;

  @ManyToOne(() => Orders, (orders) => orders.promoredemptions)
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;

  @ManyToOne(() => Users, (users) => users.promoredemptions)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;
}
