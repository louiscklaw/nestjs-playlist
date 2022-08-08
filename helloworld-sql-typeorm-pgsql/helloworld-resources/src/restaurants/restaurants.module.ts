import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
import { RestaurantEntity } from './entities/restaurant.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, Tag])],
  providers: [RestaurantsService, TagsService],
  controllers: [RestaurantsController],
})
export class RestaurantsModule {}
