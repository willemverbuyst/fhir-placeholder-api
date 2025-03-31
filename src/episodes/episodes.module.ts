import { Module } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';

@Module({
  controllers: [EpisodesController],
  providers: [EpisodesService, DataStore],
})
export class EpisodesModule {}
