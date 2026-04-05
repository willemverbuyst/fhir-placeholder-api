import { Module } from "@nestjs/common";
import { ObservationController } from "./observation.controller";
import { ObservationService } from "./observation.service";
import { Observation } from "./observation.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Observation])],
  controllers: [ObservationController],
  providers: [ObservationService],
})
export class ObservationModule {}
