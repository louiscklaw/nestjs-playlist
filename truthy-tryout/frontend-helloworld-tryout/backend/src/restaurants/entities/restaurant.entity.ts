import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToOne
} from 'typeorm';

// import * as bcrypt from 'bcrypt';
// import { Exclude } from 'class-transformer';

import { OpenStatusEnum } from '../open-status.enum';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
// import { RoleEntity } from 'src/role/entities/role.entity';

@Entity({ name: 'restaurant' })
export class RestaurantEntity extends CustomBaseEntity {
  @Column()
  name: string;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  website: string;

  @Column()
  favorite: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  address1: string;

  @Column()
  address2: string;

  @Column()
  address3: string;

  @Column()
  country: string;

  @Column()
  avatar: string;

  @Column()
  background: string;

  @Column()
  assentColor: string;

  @Column()
  totalOrders: number;

  @Column()
  totalAmountSpent: number;

  @Column()
  openStatus: OpenStatusEnum;
}
