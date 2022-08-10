import * as Bull from 'bull';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { ExpressAdapter } from '@bull-board/express';
import { NestFactory } from '@nestjs/core';
import { Queue } from 'bull';
import expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';

const REDIS_HOST = process.env.HOST_ADDRESS || 'localhost';

const connectionOpts = {
  host: REDIS_HOST,
  port: 6379,
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const serverAdapter = new ExpressAdapter();
  serverAdapter.setBasePath('/bull-board');

  const aQueue = new Bull('audio', {
    redis: {
      ...connectionOpts,
    },
  });

  createBullBoard({
    queues: [new BullAdapter(aQueue)],
    serverAdapter,
  });

  app.use(
    '/bull-board',

    serverAdapter.getRouter(),
  );

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
