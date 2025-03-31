import { Module } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  controllers: [PatientsController],
  providers: [PatientsService, DataStore],
})
export class PatientsModule {}
