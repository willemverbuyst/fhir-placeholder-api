import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { EncounterController } from './encounter.controller';
import { EncounterService } from './encounter.service';

@Module({
  imports: [DataStoreModule],
  controllers: [EncounterController],
  providers: [EncounterService],
})
export class EncounterModule {}
