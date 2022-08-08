import { Tag } from 'src/tags/entities/tag.entity';
import { Column, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToMany(() => Tag, tag => tag.users)
  @JoinTable({
    name: 'user_tag',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'tagId', referencedColumnName: 'id' },
  })
  tags: Tag[];
}
