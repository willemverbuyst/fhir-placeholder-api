import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { PractitionersController } from './practitioners.controller';
import { PractitionersService } from './practitioners.service';

@Module({
  imports: [DataStoreModule],
  controllers: [PractitionersController],
  providers: [PractitionersService],
})
export class PractitionersModule {}
