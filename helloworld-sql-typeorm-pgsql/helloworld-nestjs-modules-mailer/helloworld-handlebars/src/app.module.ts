require('dotenv').config();
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_HOST || process.env.HOST_ADDRESS || 'localhost',
        port: parseInt(process.env.SMTP_PORT, 10) || 1025,
        secure: process.env.SMTP_SECURE === 'true',
        ignoreTLS: process.env.SMTP_SECURE !== 'false',
        auth: {
          user: process.env.SMTP_AUTH_USER || 'username',
          pass: process.env.SMTP_AUTH_PASS || 'password',
        },
      },
      defaults: {
        from: '"nest-modules" <user@outlook.com>', // outgoing email ID
      },
      template: {
        dir: process.cwd() + '/template/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter() or new EjsAdapter()
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
