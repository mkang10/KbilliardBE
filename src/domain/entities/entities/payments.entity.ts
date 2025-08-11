import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders.entity";

@Index("payments_pkey", ["paymentId"], { unique: true })
@Entity("payments", { schema: "public" })
export class Payments {
  @PrimaryGeneratedColumn({ type: "bigint", name: "payment_id" })
  paymentId: string;

  @Column("enum", {
    name: "method",
    enum: ["credit_card", "paypal", "bank_transfer", "cod"],
  })
  method: "credit_card" | "paypal" | "bank_transfer" | "cod";

  @Column("integer", { name: "amount_cents" })
  amountCents: number;

  @Column("enum", {
    name: "status",
    enum: ["pending", "completed", "failed", "refunded"],
  })
  status: "pending" | "completed" | "failed" | "refunded";

  @Column("timestamp without time zone", { name: "paid_at", nullable: true })
  paidAt: Date | null;

  @ManyToOne(() => Orders, (orders) => orders.payments, { onDelete: "CASCADE" })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;
}
