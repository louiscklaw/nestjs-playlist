import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OpenStatusEnum } from 'src/restaurant/open-status.enum';
import { RestaurantEntity } from 'src/restaurant/entity/restaurant.entity';

import * as bcrypt from 'bcrypt';

export default class CreateRestaurantSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RestaurantEntity)
      .values([
        {
          name: `大盛日本料理_1`,
          email: `admin_1@truthy.com`,
          description: `restaurant 1 description`,
          website: 'https://www.openrice.com/',
          openStatus: OpenStatusEnum.ON,
          favorite: `1`,
          avatar:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
          background:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4',
          assentColor:
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4'
        }
      ])
      .orIgnore()
      .execute();
  }
}
