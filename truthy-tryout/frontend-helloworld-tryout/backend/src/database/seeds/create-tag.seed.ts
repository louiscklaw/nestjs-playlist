import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { TagEntity } from '../../tags/entities/tag.entity';

import { faker } from '@faker-js/faker';

import * as bcrypt from 'bcrypt';

export default class CreateTagSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(TagEntity)
      .values(
        Array(19)
          .fill(0)
          .map((x, i) => {
            return {
              email: faker.internet.email(),
              username: faker.animal.cat(),
              description: `tag ${i} description`
            };
          })
      )
      .orIgnore()
      .execute();
  }
}
