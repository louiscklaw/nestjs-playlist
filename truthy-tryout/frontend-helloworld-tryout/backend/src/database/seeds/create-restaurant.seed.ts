import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { OpenStatusEnum } from '../../restaurants/open-status.enum';
import { RestaurantEntity } from '../../restaurants/entities/restaurant.entity';

import { faker } from '@faker-js/faker';

import * as bcrypt from 'bcrypt';

export default class CreateRestaurantSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(RestaurantEntity)
      .values(
        Array(19)
          .fill(0)
          .map((x, i) => {
            if (i < 4) faker.locale = 'ja';
            if (i > 1 && i < 5) faker.locale = 'en';
            if (i > 5 && i < 10) faker.locale = 'zh_TW';
            if (i > 10 && i < 99) faker.locale = 'zh_CN';
            return {
              username: faker.company.name(),
              name: faker.company.name(),
              email: faker.internet.email(),
              description: `restaurant ${i} description`,
              website: 'https://www.openrice.com/',
              favorite: '1',
              city: faker.address.city(),
              state: faker.address.state(),
              country: faker.address.country(),
              avatar: faker.image.avatar(),
              background: faker.image.cats(),
              assentColor: '#800000',
              address1: `address_${i}_1`,
              address2: `address_${i}_2`,
              address3: `address_${i}_3`,
              openStatus: OpenStatusEnum.OPEN,
              totalOrders: i,
              totalAmountSpent: parseFloat(`${i}.${i}`)
            };
          })
      )
      .orIgnore()
      .execute();
  }
}
