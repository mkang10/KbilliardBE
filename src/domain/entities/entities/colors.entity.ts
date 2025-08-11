import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Variantcolors } from "./variantcolors.entity";

@Index("colors_pkey", ["colorId"], { unique: true })
@Index("colors_name_key", ["name"], { unique: true })
@Entity("colors", { schema: "public" })
export class Colors {
  @PrimaryGeneratedColumn({ type: "integer", name: "color_id" })
  colorId: number;

  @Column("character varying", { name: "name", unique: true, length: 50 })
  name: string;

  @Column("character", { name: "hex_code", nullable: true, length: 7 })
  hexCode: string | null;

  @OneToMany(() => Variantcolors, (variantcolors) => variantcolors.color)
  variantcolors: Variantcolors[];
}
