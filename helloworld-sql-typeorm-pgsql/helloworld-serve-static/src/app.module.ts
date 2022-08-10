import { join } from "path";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ServeStaticModule } from "@nestjs/serve-static";

import { UsersModule } from "./users/users.module";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST_ADDRESS || "localhost",
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "client"),
    }),
  ],
})
export class AppModule {}
