import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { APP_GUARD, APP_INTERCEPTOR } from "@nestjs/core";
import { ThrottlerGuard, ThrottlerModule } from "@nestjs/throttler";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, { provide: APP_GUARD, useClass: ThrottlerGuard }],
  controllers: [UsersController],
})
export class UsersModule {}
