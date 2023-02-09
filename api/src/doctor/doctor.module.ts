import { Module } from '@nestjs/common';
import { DoctorController } from './doctor.controller';

@Module({
  controllers: [DoctorController],
})
export class DoctorModule {}
