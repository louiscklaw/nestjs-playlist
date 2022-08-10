import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST_ADDRESS,
      port: 5432,
      username: "postgres",
      password: "postgres",
      database: "test",
      autoLoadEntities: true,
      synchronize: true,
    }),
    UsersModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
  ],
})
export class AppModule {}
