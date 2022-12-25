import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';

import { Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

// import { UserSearchFilterDto } from 'src/auth/dto/user-search-filter.dto';
// import { TagSearchFilterDto } from './dto/search-tag-dto';
import { TagEntity } from './entities/tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagsRepository: Repository<TagEntity>
  ) {}

  create(createTagDto: CreateTagDto) {
    return 'This action adds a new tag';
  }

  async findAll() {
    // return `This action returns all tags`;
    return await this.tagsRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} tag`;
  }

  update(id: number, updateTagDto: UpdateTagDto) {
    return `This action updates a #${id} tag`;
  }

  remove(id: number) {
    return `This action removes a #${id} tag`;
  }
}
