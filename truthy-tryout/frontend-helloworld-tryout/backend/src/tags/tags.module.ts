import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagEntity } from './entities/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],

  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
