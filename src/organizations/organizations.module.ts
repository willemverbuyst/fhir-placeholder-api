import { Module } from '@nestjs/common';
import { DataStore } from '../db/dataStore.service';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

@Module({
  controllers: [OrganizationsController],
  providers: [OrganizationsService, DataStore],
})
export class OrganizationsModule {}
