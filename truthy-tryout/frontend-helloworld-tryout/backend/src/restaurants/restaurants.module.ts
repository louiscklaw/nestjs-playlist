import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';

import { RestaurantEntity } from './entities/restaurant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
