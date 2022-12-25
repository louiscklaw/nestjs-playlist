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

import { CustomBaseEntity } from 'src/common/entity/custom-base.entity';

@Entity({ name: 'tag' })
export class TagEntity extends CustomBaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  description: string;
}
