import * as express from 'express';
import * as cors from 'cors';

import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../api/app/app.module';
import { ManagerProducerService } from './manager-producer/services/manager-producer.service';
import { Logger } from '@nestjs/common';

export const nestServer: express.Express = express();

nestServer.use(express.json());
nestServer.use(express.urlencoded({ extended: false }));
nestServer.use(cors());

const startNestApplication = async (
  expressInstance: express.Express,
): Promise<void> => {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressInstance),
  );

  const logger = new Logger('startNestApplication');

  const sqsProducer = app.get(ManagerProducerService);
  await sqsProducer.produce();

  logger.log('SQS Producer started');

  await app.init();
};

void startNestApplication(nestServer);
