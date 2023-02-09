import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [DoctorModule, UserModule, ConfigModule.forRoot()],
})
export class AppModule {}
