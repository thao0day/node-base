import { Module } from '@nestjs/common';
import { DoctorModule } from './doctor/doctor.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [DoctorModule, UserModule],
})
export class AppModule {}
