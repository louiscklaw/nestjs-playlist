import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const UPLOAD_DIR = './public';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('upload_stl')
  @UseInterceptors(FileInterceptor('file'))
  async uploadStl(@UploadedFile() file: Express.Multer.File): Promise<object> {
    const uuid_filename = uuidv4();

    await fs.writeFileSync(`./public/${uuid_filename}.stl`, file.buffer);

    return {
      result: 'uploaded',
      orphan: `${uuid_filename}.stl`,
      orphan_url: `http://localhost:3000/public/${uuid_filename}.stl`,
    };
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<object> {
    const uuid_filename = uuidv4();
    console.log({ file });
    // fs.writeFile('./uploads/image.avif', file.buffer, function (err) {
    //   if (err) throw err;
    // });
    await fs.writeFileSync(`${UPLOAD_DIR}/${uuid_filename}.avif`, file.buffer);

    return {
      result: 'uploaded',
      orphan: `${uuid_filename}.avif`,
      orphan_url: `http://localhost:3000/public/${uuid_filename}.avif`,
    };
  }
}
