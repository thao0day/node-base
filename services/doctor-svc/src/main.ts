import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import configuration from '../config/configuation';

const config = configuration();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.http.port);
}
bootstrap();
