import { Module } from "@nestjs/common";
import { EncounterController } from "./encounter.controller";
import { EncounterService } from "./encounter.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Encounter } from "./encounter.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Encounter])],
  controllers: [EncounterController],
  providers: [EncounterService],
})
export class EncounterModule {}
