import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { TagsModule } from "./tags/tags.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "postgres",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    TagsModule,
  ],
})
export class AppModule {}
