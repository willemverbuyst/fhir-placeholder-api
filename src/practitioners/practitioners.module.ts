import { Module } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { PractitionersController } from './practitioners.controller';
import { PractitionersService } from './practitioners.service';

@Module({
  controllers: [PractitionersController],
  providers: [PractitionersService, DataStore],
})
export class PractitionersModule {}
