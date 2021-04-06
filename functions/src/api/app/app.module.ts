import { Module, forwardRef } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from '../app/controllers/app.controller';
import { AppService } from '../app/services/app.service';
import { ManagerProducerModule } from '../manager-producer/manager-producer.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    forwardRef(() => ManagerProducerModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
