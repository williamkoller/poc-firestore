import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, SQS } from 'aws-sdk';
import { Producer } from 'sqs-producer';
import { onProductUpdate } from '../../../index';
import { Message } from 'sqs-producer/dist/types';
import { v4 } from 'uuid';

if (process.env.MODE === 'DEVELOP') {
  config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  });
}

@Injectable()
export class ManagerProducerService {
  private logger = new Logger(ManagerProducerService.name);
  private producer: Producer;
  constructor(private readonly configService: ConfigService) {
    this.producer = Producer.create({
      queueUrl: this.configService.get('MANAGER_PRODUCER_SQL'),
      sqs: new SQS({
        maxRetries: 10,
        httpOptions: { timeout: 500000 },
        region: this.configService.get('AWS_REGION'),
      }),
    });
  }
  async produce(): Promise<void> {
    const productIsObject = onProductUpdate;
    const productIsArray = Object.keys(productIsObject);

    const messages: Message[] = productIsArray.map((item) => ({
      id: v4(),
      body: JSON.stringify(item),
    }));

    this.logger.log(messages.length);
    try {
      await this.producer.send(messages);
    } catch (e) {
      throw new Error(e.message);
    }
    const size = await this.producer.queueSize();
    this.logger.log(`There are ${size} messages on the queue.`);
  }
}
