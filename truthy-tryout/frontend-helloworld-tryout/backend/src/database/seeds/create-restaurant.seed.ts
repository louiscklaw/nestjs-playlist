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
        Array(3)
          .fill(0)
          .map((x, i) => {
            if (i < 10) faker.locale = 'ja';
            if (i > 10 && i < 20) faker.locale = 'en';
            if (i > 20 && i < 30) faker.locale = 'zh_TW';
            if (i > 30 && i < 40) faker.locale = 'zh_CN';
            return {
              name: faker.company.companyName(),
              email: faker.internet.email(),
              description: `restaurant ${i} description`,
              website: 'https://www.openrice.com/',
              favorite: '1',
              avatar: faker.image.avatar(),
              background: faker.image.cats(),
              assentColor: '#800000',
              address1: `address_${i}_1`,
              address2: `address_${i}_2`,
              address3: `address_${i}_3`,
              totalOrders: i,
              totalAmountSpent: parseFloat(`${i}.${i}`)
            };
          })
      )
      .orIgnore()
      .execute();
  }
}
