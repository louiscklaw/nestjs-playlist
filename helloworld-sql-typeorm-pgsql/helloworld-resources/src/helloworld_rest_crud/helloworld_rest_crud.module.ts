import { Module } from '@nestjs/common';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { HelloworldRestCrudController } from './helloworld_rest_crud.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HelloworldRestCrud } from './entities/helloworld_rest_crud.entity';
import { Tag } from 'src/tags/entities/tag.entity';
import { TagsService } from 'src/tags/tags.service';

@Module({
  imports: [TypeOrmModule.forFeature([HelloworldRestCrud, Tag])],
  controllers: [HelloworldRestCrudController],
  providers: [HelloworldRestCrudService, TagsService],
})
export class HelloworldRestCrudModule {}
