import { Injectable } from '@nestjs/common';
import { CreateHelloworldDto } from './dto/create-helloworld.dto';
import { UpdateHelloworldDto } from './dto/update-helloworld.dto';

@Injectable()
export class HelloworldService {
  create(createHelloworldDto: CreateHelloworldDto) {
    return 'This action adds a new helloworld';
  }

  findAll() {
    return `This action returns all helloworld`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helloworld`;
  }

  update(id: number, updateHelloworldDto: UpdateHelloworldDto) {
    return `This action updates a #${id} helloworld`;
  }

  remove(id: number) {
    return `This action removes a #${id} helloworld`;
  }
}
