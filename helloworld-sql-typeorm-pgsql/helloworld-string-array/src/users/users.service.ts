import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    console.log(createUserDto.testStringArray);
    return await this.repository.save({
      ...createUserDto,
      testStringArray: JSON.stringify(createUserDto.testStringArray),
      testStoreObject: JSON.stringify(createUserDto.testStoreObject),
    });
  }

  async findAll(): Promise<User[]> {
    const all_record = await this.repository.find();
    let bloat_record = [];
    // bloat records for string array
    for (let i = 0; i < all_record.length; i++) {
      bloat_record.push({
        ...all_record[i],
        testStringArray: JSON.parse(all_record[i].testStringArray),
        testStoreObject: JSON.parse(all_record[i].testStoreObject),
      });
    }
    return bloat_record;
  }

  findOne(id: number): Promise<User> {
    return this.repository.findOneBy({ id: id });
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async removeAll(): Promise<void> {
    const all_record = await this.repository.find();
    for (let i = 0; i < all_record.length; i++) {
      await this.repository.delete(all_record[i].id);
    }
    return;
  }
}
