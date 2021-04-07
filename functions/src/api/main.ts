import { NestFactory } from '@nestjs/core';
import { AppModule } from '../api/app/app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const port = process.env.PORT;
  await app.listen(port, () =>
    logger.log(`Server running in ${process.env.APP_URL}:${port}`),
  );
}
bootstrap();
