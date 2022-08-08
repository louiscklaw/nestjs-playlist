import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { TagsModule } from './tags/tags.module';
import { RestaurantsModule } from './restaurants/restaurants.module';
import { HelloworldRestCrudModule } from './helloworld_rest_crud/helloworld_rest_crud.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TagsModule,
    RestaurantsModule,
    HelloworldRestCrudModule,
  ],
})
export class AppModule {}
