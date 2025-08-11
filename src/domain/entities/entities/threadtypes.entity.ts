import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Variantthreads } from "./variantthreads.entity";

@Index("threadtypes_name_key", ["name"], { unique: true })
@Index("threadtypes_pkey", ["threadTypeId"], { unique: true })
@Entity("threadtypes", { schema: "public" })
export class Threadtypes {
  @PrimaryGeneratedColumn({ type: "integer", name: "thread_type_id" })
  threadTypeId: number;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("character varying", {
    name: "description",
    nullable: true,
    length: 255,
  })
  description: string | null;

  @OneToMany(
    () => Variantthreads,
    (variantthreads) => variantthreads.threadType
  )
  variantthreads: Variantthreads[];
}
