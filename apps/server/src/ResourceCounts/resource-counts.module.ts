import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { ResourceCountsController } from "./resource-counts.controller";
import { ResourceCountsService } from "./resource-counts.service";

@Module({
  imports: [DataStoreModule],
  controllers: [ResourceCountsController],
  providers: [ResourceCountsService],
})
export class ResourceCountsModule {}
