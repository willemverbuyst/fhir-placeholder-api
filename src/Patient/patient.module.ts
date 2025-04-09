import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';

@Module({
  imports: [DataStoreModule],
  controllers: [PatientController],
  providers: [PatientService],
})
export class PatientModule {}
