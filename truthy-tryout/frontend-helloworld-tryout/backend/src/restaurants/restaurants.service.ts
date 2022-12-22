import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { UpdateRestaurantDto } from './dto/update-restaurant.dto';

import { RestaurantEntity } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private readonly restaurantsRepository: Repository<RestaurantEntity>
  ) {}

  create(createRestaurantDto: CreateRestaurantDto): Promise<RestaurantEntity> {
    const restaurant = new RestaurantEntity();
    restaurant.name = createRestaurantDto.name;
    restaurant.email = createRestaurantDto.email;

    return this.restaurantsRepository.save(createRestaurantDto);
  }

  findAll() {
    // return `This action returns all restaurants`;
    return this.restaurantsRepository.find();
  }

  findOne(id: number): Promise<RestaurantEntity> {
    return this.restaurantsRepository.findOne({ id: id });
  }

  update(id: number, updateRestaurantDto: UpdateRestaurantDto) {
    return `This action updates a #${id} restaurant`;
  }

  async remove(id: number): Promise<void> {
    await this.restaurantsRepository.delete(id);
  }
}
