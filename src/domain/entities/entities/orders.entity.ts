import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orderitems } from "./orderitems.entity";
import { Addresses } from "./addresses.entity";
import { Users } from "./users.entity";
import { Payments } from "./payments.entity";
import { Promoredemptions } from "./promoredemptions.entity";
import { Shipments } from "./shipments.entity";

@Index("orders_pkey", ["orderId"], { unique: true })
@Entity("orders", { schema: "public" })
export class Orders {
  @PrimaryGeneratedColumn({ type: "bigint", name: "order_id" })
  orderId: string;

  @Column("enum", {
    name: "status",
    enum: [
      "pending",
      "confirmed",
      "shipped",
      "delivered",
      "cancelled",
      "returned",
    ],
    default: () => "'pending'",
  })
  status:
    | "pending"
    | "confirmed"
    | "shipped"
    | "delivered"
    | "cancelled"
    | "returned";

  @Column("integer", { name: "total_cents" })
  totalCents: number;

  @Column("timestamp without time zone", {
    name: "placed_at",
    default: () => "now()",
  })
  placedAt: Date;

  @Column("timestamp without time zone", {
    name: "updated_at",
    default: () => "now()",
  })
  updatedAt: Date;

  @OneToMany(() => Orderitems, (orderitems) => orderitems.order)
  orderitems: Orderitems[];

  @ManyToOne(() => Addresses, (addresses) => addresses.orders)
  @JoinColumn([{ name: "address_id", referencedColumnName: "addressId" }])
  address: Addresses;

  @ManyToOne(() => Users, (users) => users.orders)
  @JoinColumn([{ name: "user_id", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => Payments, (payments) => payments.order)
  payments: Payments[];

  @OneToMany(
    () => Promoredemptions,
    (promoredemptions) => promoredemptions.order
  )
  promoredemptions: Promoredemptions[];

  @OneToMany(() => Shipments, (shipments) => shipments.order)
  shipments: Shipments[];
}
