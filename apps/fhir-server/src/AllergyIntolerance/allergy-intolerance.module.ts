import { Module } from "@nestjs/common";
import { AllergyIntoleranceController } from "./allergy-intolerance.controller";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AllergyIntolerance } from "./allergy-intolerance.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AllergyIntolerance])],
  controllers: [AllergyIntoleranceController],
  providers: [AllergyIntoleranceService],
})
export class AllergyIntoleranceModule {}
