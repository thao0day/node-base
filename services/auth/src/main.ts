import { INestMicroservice, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';
import { protobufPackage } from './auth/auth.pb';
import configuration from '../config/configuation';

const config = configuration();

async function bootstrap() {
  const app: INestMicroservice = await NestFactory.createMicroservice(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        url: config.grpc.host + ':' + config.grpc.port,
        package: protobufPackage,
        protoPath: join(
          __dirname,
          '../../../../node_modules/core-proto/auth.proto',
        ),
      },
    },
  );

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen();
}

bootstrap();
