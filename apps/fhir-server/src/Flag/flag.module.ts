import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { FlagController } from "./flag.controller";
import { FlagService } from "./flag.service";

@Module({
  imports: [DataStoreModule],
  controllers: [FlagController],
  providers: [FlagService],
})
export class FlagModule {}
