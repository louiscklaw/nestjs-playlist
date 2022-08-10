import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { TagService } from '../tag/tag.service'
import { Tag } from '../tag/entities/tag.entity'

// import { Tag } from '../tags/entities/tag.entity'
// import { TagsService } from '../tags/tags.service'

import { User } from './user.entity'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
  imports: [TypeOrmModule.forFeature([User, Tag])],
  controllers: [UsersController],
  providers: [UsersService, TagService],
})
export class UsersModule {}
