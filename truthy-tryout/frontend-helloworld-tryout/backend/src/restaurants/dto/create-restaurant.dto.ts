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
  city: string;

  @IsString()
  state: string;

  @IsString()
  address1: string;

  @IsString()
  address2: string;

  @IsString()
  address3: string;

  @IsString()
  country: string;

  @IsString()
  background: string;

  @IsString()
  assentColor: string;

  @IsNumber()
  totalOrders: number;

  @IsNumber()
  totalAmountSpent: number;
}
