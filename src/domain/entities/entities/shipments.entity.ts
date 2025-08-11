import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Orders } from "./orders.entity";

@Index("shipments_pkey", ["shipmentId"], { unique: true })
@Entity("shipments", { schema: "public" })
export class Shipments {
  @PrimaryGeneratedColumn({ type: "bigint", name: "shipment_id" })
  shipmentId: string;

  @Column("character varying", {
    name: "carrier_name",
    nullable: true,
    length: 100,
  })
  carrierName: string | null;

  @Column("character varying", {
    name: "tracking_number",
    nullable: true,
    length: 100,
  })
  trackingNumber: string | null;

  @Column("timestamp without time zone", { name: "shipped_at", nullable: true })
  shippedAt: Date | null;

  @Column("timestamp without time zone", {
    name: "expected_arrival",
    nullable: true,
  })
  expectedArrival: Date | null;

  @Column("enum", {
    name: "status",
    enum: ["preparing", "in_transit", "delivered", "exception"],
    default: () => "'preparing'",
  })
  status: "preparing" | "in_transit" | "delivered" | "exception";

  @ManyToOne(() => Orders, (orders) => orders.shipments, {
    onDelete: "CASCADE",
  })
  @JoinColumn([{ name: "order_id", referencedColumnName: "orderId" }])
  order: Orders;
}
