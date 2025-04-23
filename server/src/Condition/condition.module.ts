import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { ConditionController } from './condition.controller';
import { ConditionService } from './condition.service';

@Module({
  imports: [DataStoreModule],
  controllers: [ConditionController],
  providers: [ConditionService],
})
export class ConditionModule {}
