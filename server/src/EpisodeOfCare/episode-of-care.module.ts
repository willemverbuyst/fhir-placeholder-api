import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { EpisodeOfCareController } from "./episode-of-care.controller";
import { EpisodeOfCareService } from "./episode-of-care.service";

@Module({
  imports: [DataStoreModule],
  controllers: [EpisodeOfCareController],
  providers: [EpisodeOfCareService],
})
export class EpisodeOfCareModule {}
