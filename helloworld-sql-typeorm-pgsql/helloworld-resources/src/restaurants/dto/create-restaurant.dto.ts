import { Tag } from 'src/tags/entities/tag.entity';

export class CreateRestaurantDto {
  name: string;

  location: string;

  isActive: boolean;

  tags: Tag[];
}
