import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import configuration from '../config/configuation';

@Module({
  imports: [
    DoctorModule,
    UserModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
})
export class AppModule {}
