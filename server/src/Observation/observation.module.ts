import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { ObservationController } from './observation.controller';
import { ObservationService } from './observation.service';

@Module({
  imports: [DataStoreModule],
  controllers: [ObservationController],
  providers: [ObservationService],
})
export class ObservationModule {}
