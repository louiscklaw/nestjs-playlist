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

// import { OpenStatusEnum } from '../open-status.enum';
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

  @Index({ unique: true })
  @Column()
  description: string;

  @Index({ unique: true })
  @Column()
  website: string;

  @Index({ unique: true })
  @Column()
  favorite: string;

  @Index({ unique: true })
  @Column()
  avatar: string;

  @Index({ unique: true })
  @Column()
  background: string;

  @Index({ unique: true })
  @Column()
  assentColor: string;
}
