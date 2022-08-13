import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";
import { UsersService } from "./users.service";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get("/helloworld")
  helloWorld(): string {
    return "helloworld";
  }

  @Get("/delete_all")
  @HttpCode(HttpStatus.NO_CONTENT)
  async helloWorldBlaBlaBla(): Promise<void> {
    return this.usersService.removeAll();
  }

  @Get("/")
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id", ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.usersService.remove(id);
  }
}
