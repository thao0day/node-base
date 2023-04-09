import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { USER_PACKAGE_NAME, USER_SERVICE_NAME } from './user.pb';
import { join } from 'path';
import configuration from '../../config/configuation';
const config = configuration();

@Module({
  imports: [
    ClientsModule.register([
      {
        name: USER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: config.services.user.host + ':' + config.services.user.port,
          package: USER_PACKAGE_NAME,
          protoPath: join(
            __dirname,
            '../../../../node_modules/core-proto/user.proto',
          ),
        },
      },
    ]),
  ],
  controllers: [UserController],
})
export class UserModule {}
