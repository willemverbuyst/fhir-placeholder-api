import { Module } from "@nestjs/common";
import { EpisodeOfCareController } from "./episode-of-care.controller";
import { EpisodeOfCareService } from "./episode-of-care.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { EpisodeOfCare } from "./episode-of-care.entity";

@Module({
  imports: [TypeOrmModule.forFeature([EpisodeOfCare])],
  controllers: [EpisodeOfCareController],
  providers: [EpisodeOfCareService],
})
export class EpisodeOfCareModule {}
