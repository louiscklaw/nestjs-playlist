import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf
} from 'class-validator';

export class CreateTagDto {
  @IsString()
  username: string;
}
