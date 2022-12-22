import {
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf
} from 'class-validator';

export class CreateRestaurantDto {
  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  description: string;

  @IsString()
  website: string;

  @IsString()
  favorite: string;

  @IsString()
  avatar: string;

  @IsString()
  background: string;

  @IsString()
  assentColor: string;

  @IsNumber()
  totalOrders: number;

  @IsNumber()
  totalAmountSpent: number;
}
