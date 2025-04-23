import { Module } from '@nestjs/common';
import { DataStoreModule } from '../db/dataStore.module';
import { OrganizationController } from './organization.controller';
import { OrganizationService } from './organization.service';

@Module({
  imports: [DataStoreModule],
  controllers: [OrganizationController],
  providers: [OrganizationService],
})
export class OrganizationModule {}
