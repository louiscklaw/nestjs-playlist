import { PartialType } from '@nestjs/mapped-types';
import { CreateHelloworldDto } from './create-helloworld.dto';

export class UpdateHelloworldDto extends PartialType(CreateHelloworldDto) {}
