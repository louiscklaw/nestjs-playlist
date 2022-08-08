import { Tag } from 'src/tags/entities/tag.entity';

export class CreateHelloworldRestCrudDto {
  name: string;

  location: string;

  isActive: boolean;

  tags: Tag[];
}
