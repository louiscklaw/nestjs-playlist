import { Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';

import { UserEntity } from 'src/auth/entity/user.entity';
import { UserStatusEnum } from 'src/auth/user-status.enum';
import { RoleEntity } from 'src/role/entities/role.entity';
import * as bcrypt from 'bcrypt';

export default class CreateUserSeed {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const role = await connection
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.name = :name', {
        name: 'superuser'
      })
      .getOne();

    if (!role) {
      return;
    }
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        {
          username: 'admin',
          email: 'admin@truthy.com',
          password:
            '$2b$10$O9BWip02GuE14bDPfBomQebCjwKQyuUfkulhvBB1UoizOeKxGG8Fu', // Truthy@123
          salt: '$2b$10$O9BWip02GuE14bDPfBomQe',
          name: 'truthy',
          status: UserStatusEnum.ACTIVE,
          roleId: role.id,
          avatar:
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
          address1: '1_address1',
          address2: '1_address2',
          country: '1_country',
          isVerified: '1_isVerified',
          phone: '1_phone',
          state: '1_state'
        },
        {
          username: 'demo@devias.io',
          email: 'demo@devias.io',
          password: await bcrypt.hash(
            'Password123!',
            '$2b$10$O9BWip02GuE14bDPfBomQe'
          ), // Password123!
          salt: '$2b$10$O9BWip02GuE14bDPfBomQe',
          name: 'demo_name',
          status: UserStatusEnum.ACTIVE,
          roleId: role.id,
          avatar:
            'https://images.unsplash.com/photo-1633332755192-727a05c4013d',
          address1: '2_address1',
          address2: '2_address2',
          country: '2_country',
          isVerified: '2_isVerified',
          phone: '2_phone',
          state: '2_state'
        }
      ])
      .orIgnore()
      .execute();
  }
}
