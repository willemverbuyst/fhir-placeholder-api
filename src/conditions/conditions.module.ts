import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { ConditionsController } from './conditions.controller';
import { ConditionsService } from './conditions.service';

@Module({
  imports: [DataStoreModule],
  controllers: [ConditionsController],
  providers: [ConditionsService],
})
export class ConditionsModule {}
