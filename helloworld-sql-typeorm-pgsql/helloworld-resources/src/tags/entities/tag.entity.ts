import { HelloworldRestCrud } from 'src/helloworld_rest_crud/entities/helloworld_rest_crud.entity';
import { RestaurantEntity } from 'src/restaurants/entities/restaurant.entity';
import { User } from 'src/users/user.entity';
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(() => User, user => user.tags)
  users: User[];

  @ManyToMany(() => RestaurantEntity, restaurant => restaurant.tags)
  restaurants: RestaurantEntity[];

  @ManyToMany(() => HelloworldRestCrud, helloworldRestCrud => helloworldRestCrud.tags)
  helloworldRestCrud: HelloworldRestCrud[];
}
