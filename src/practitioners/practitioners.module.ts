import { Module } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';
import { PractitionersController } from './practitioners.controller';
import { PractitionersService } from './practitioners.service';

@Module({
  controllers: [PractitionersController],
  providers: [PractitionersService, DataStore],
})
export class PractitionersModule {}
