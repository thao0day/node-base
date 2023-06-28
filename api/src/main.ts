import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuation';
import { VersioningType } from '@nestjs/common';

const config = configuration();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  await app.listen(config.http.port);
}

bootstrap();
