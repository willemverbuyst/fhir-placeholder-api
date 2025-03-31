import { Module } from '@nestjs/common';
import { DataStore } from './dataStore.service';

@Module({
  providers: [DataStore],
  exports: [DataStore],
})
export class DatabaseModule {}
