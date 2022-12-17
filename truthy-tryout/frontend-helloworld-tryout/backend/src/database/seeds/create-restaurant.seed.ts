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
      .values(
        Array(10)
          .fill(0)
          .map((r, i) => {
            return {
              name: `example_restaurant_${i}`,
              email: `admin_${i}@truthy.com`
            };
          })
      )
      .orIgnore()
      .execute();
  }
}
