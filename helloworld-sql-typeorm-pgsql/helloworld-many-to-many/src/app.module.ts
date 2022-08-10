import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

// import { TagsModule } from './tags/tags.module'
import { UsersModule } from './users/users.module'
import { HelloworldModule } from './helloworld/helloworld.module'
import { TagModule } from './tag/tag.module'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TagModule,
    HelloworldModule,
  ],
})
export class AppModule {}
