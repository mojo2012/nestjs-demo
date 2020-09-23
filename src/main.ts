import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';



async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);
  await app.listen(port);

  Logger.verbose(`Listening on port ${port}`);
}
bootstrap();
