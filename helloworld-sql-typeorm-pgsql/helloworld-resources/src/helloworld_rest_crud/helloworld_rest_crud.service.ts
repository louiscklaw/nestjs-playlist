import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateHelloworldRestCrudDto } from './dto/create-helloworld_rest_crud.dto';
import { UpdateHelloworldRestCrudDto } from './dto/update-helloworld_rest_crud.dto';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';

@Injectable()
export class HelloworldRestCrudService {
  constructor(
    @InjectRepository(HelloworldRestCrud)
    private repository: Repository<HelloworldRestCrud>,
  ) {}

  async create(createHelloworldRestCrudDto: CreateHelloworldRestCrudDto): Promise<HelloworldRestCrud> {
    // return 'This action adds a new helloworldRestCrud';
    return await this.repository.save(createHelloworldRestCrudDto);
  }

  async findAll(): Promise<HelloworldRestCrud[]> {
    return await this.repository.find({ relations: { tags: true } });
    // return `This action returns all helloworldRestCrud`;
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
