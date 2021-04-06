import * as express from 'express';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '@/api/app.module';

export const nestServer: express.Express = express();

nestServer.use(express.json());
nestServer.use(express.urlencoded({ extended: false }));
nestServer.use(cors());

const startNestApplication = async (expressInstance: express.Express) => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  await app.init();
};

void startNestApplication(nestServer);
