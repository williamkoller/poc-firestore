import { Injectable } from '@nestjs/common';
import { Producer } from 'sqs-producer';

@Injectable()
export class ManagerProducerService {
  constructor(private readonly producer: Producer) {}
}
