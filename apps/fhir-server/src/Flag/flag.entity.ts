import { Flag as TFlag } from "fhir/r5";
import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Entity } from "typeorm/decorator/entity/Entity";

@Entity()
export class Flag {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "jsonb" })
  resource: TFlag;
}
