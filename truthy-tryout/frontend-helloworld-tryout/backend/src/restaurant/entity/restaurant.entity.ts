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
import * as bcrypt from 'bcrypt';
import { Exclude } from 'class-transformer';

import { OpenStatusEnum } from 'src/restaurant/open-status.enum';
import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';
// import { RoleEntity } from 'src/role/entities/role.entity';

@Entity({ name: 'restaurant' })
export class RestaurantEntity extends CustomBaseEntity {
  @Index({ unique: true })
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
  openStatus: OpenStatusEnum;

  @Column()
  favorite: string;

  @Column()
  avatar: string;

  @Column()
  background: string;

  @Column()
  assentColor: string;
}
