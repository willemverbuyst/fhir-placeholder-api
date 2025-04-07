import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { PatientsController } from './patients.controller';
import { PatientsService } from './patients.service';

@Module({
  imports: [DataStoreModule],
  controllers: [PatientsController],
  providers: [PatientsService],
})
export class PatientsModule {}
