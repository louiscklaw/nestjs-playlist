import { Injectable } from '@nestjs/common';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';

@Injectable()
export class HelloworldRestCrudService {
  create(createHelloworldRestCrudDto: CreateHelloworldRestCrudDto) {
    return 'This action adds a new helloworldRestCrud';
  }

  findAll() {
    return `This action returns all helloworldRestCrud`;
  }

  findOne(id: number) {
    return `This action returns a #${id} helloworldRestCrud`;
  }

  update(id: number, updateHelloworldRestCrudDto: UpdateHelloworldRestCrudDto) {
    return `This action updates a #${id} helloworldRestCrud`;
  }

  remove(id: number) {
    return `This action removes a #${id} helloworldRestCrud`;
  }
}
