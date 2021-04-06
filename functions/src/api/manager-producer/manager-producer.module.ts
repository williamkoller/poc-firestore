import { Module } from '@nestjs/common';
import { ManagerProducerService } from './services/manager-producer.service';

@Module({
  providers: [ManagerProducerService],
})
export class ManagerProducerModule {}
