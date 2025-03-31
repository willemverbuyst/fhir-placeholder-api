import { Module } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';

@Module({
  controllers: [ConditionsController],
  providers: [ConditionsService, DataStore],
})
export class ConditionsModule {}
