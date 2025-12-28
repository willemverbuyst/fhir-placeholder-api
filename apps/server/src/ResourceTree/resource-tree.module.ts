import { Module } from "@nestjs/common";
import { DataStoreModule } from "src/db/dataStore.module";
import { ResourceTreeController } from "./resource-tree.controller";
import { ResourceTreeService } from "./resource-tree.service";

@Module({
  imports: [DataStoreModule],
  controllers: [ResourceTreeController],
  providers: [ResourceTreeService],
})
export class ResourceTreeModule {}
