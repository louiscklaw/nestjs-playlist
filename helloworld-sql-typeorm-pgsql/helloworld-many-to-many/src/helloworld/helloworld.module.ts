import { Module } from '@nestjs/common';
import { HelloworldService } from './helloworld.service';
import { HelloworldController } from './helloworld.controller';

@Module({
  controllers: [HelloworldController],
  providers: [HelloworldService]
})
export class HelloworldModule {}
