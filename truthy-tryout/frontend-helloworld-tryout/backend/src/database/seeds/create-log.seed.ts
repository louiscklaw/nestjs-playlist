import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { LogEntity } from '../../logs/entities/log.entity';

import { faker } from '@faker-js/faker';

import * as bcrypt from 'bcrypt';

export default class CreateTagSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(LogEntity)
      .values(
        Array(19)
          .fill(0)
          .map((x, i) => {
            return {
              email: faker.internet.email(),
              username: faker.animal.cat(),
              description: `log ${i} description`
            };
          })
      )
      .orIgnore()
      .execute();
  }
}
