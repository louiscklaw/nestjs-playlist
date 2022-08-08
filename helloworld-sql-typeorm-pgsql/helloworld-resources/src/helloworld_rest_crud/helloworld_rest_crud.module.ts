import { Module } from '@nestjs/common';
import { HelloworldRestCrudService } from './helloworld_rest_crud.service';
import { HelloworldRestCrudController } from './helloworld_rest_crud.controller';

@Module({
  controllers: [HelloworldRestCrudController],
  providers: [HelloworldRestCrudService]
})
export class HelloworldRestCrudModule {}
