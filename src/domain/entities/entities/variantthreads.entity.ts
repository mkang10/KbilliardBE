import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Threadtypes } from "./threadtypes.entity";
import { Productvariants } from "./productvariants.entity";

@Index(
  "variantthreads_variant_id_thread_type_id_key",
  ["threadTypeId", "variantId"],
  { unique: true }
)
@Index("variantthreads_pkey", ["variantThreadId"], { unique: true })
@Entity("variantthreads", { schema: "public" })
export class Variantthreads {
  @PrimaryGeneratedColumn({ type: "bigint", name: "variant_thread_id" })
  variantThreadId: string;

  @Column("bigint", { name: "variant_id", unique: true })
  variantId: string;

  @Column("integer", { name: "thread_type_id", unique: true })
  threadTypeId: number;

  @ManyToOne(() => Threadtypes, (threadtypes) => threadtypes.variantthreads)
  @JoinColumn([
    { name: "thread_type_id", referencedColumnName: "threadTypeId" },
  ])
  threadType: Threadtypes;

  @ManyToOne(
    () => Productvariants,
    (productvariants) => productvariants.variantthreads,
    { onDelete: "CASCADE" }
  )
  @JoinColumn([{ name: "variant_id", referencedColumnName: "variantId" }])
  variant: Productvariants;
}
