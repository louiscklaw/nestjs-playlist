import { Column, Entity, Generated, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Generated("uuid")
  uuid: string;

  @Column({ default: "" })
  firstName: string;

  @Column({ default: "" })
  lastName: string;

  @Column({ default: "" })
  testStringArray: string;

  @Column({ default: "" })
  testStoreObject: string;

  @Column({ default: true })
  isActive: boolean;
}
