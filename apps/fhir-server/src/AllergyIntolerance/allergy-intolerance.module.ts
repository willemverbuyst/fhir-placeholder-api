import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { AllergyIntoleranceController } from "./allergy-intolerance.controller";
import { AllergyIntoleranceService } from "./allergy-intolerance.service";

@Module({
  imports: [DataStoreModule],
  controllers: [AllergyIntoleranceController],
  providers: [AllergyIntoleranceService],
})
export class AllergyIntoleranceModule {}
