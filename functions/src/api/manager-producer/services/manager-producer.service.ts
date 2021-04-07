import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { config, SQS } from 'aws-sdk';
import { Producer } from 'sqs-producer';

@Injectable()
export class ManagerProducerService {
  private logger = new Logger(ManagerProducerService.name);
  constructor(
    private readonly configService: ConfigService,
    private readonly producer: Producer,
  ) {
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
    if (this.configService.get('MODE') === 'DEVELOP') {
      config.update({
        region: this.configService.get('AWS_REGION'),
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      });
    }
    try {
      await this.producer.send('');
    } catch (e) {
      throw new Error(e.message);
    }
  }
}
