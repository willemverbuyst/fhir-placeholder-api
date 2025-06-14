import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { PractitionerController } from "./practitioner.controller";
import { PractitionerService } from "./practitioner.service";

@Module({
  imports: [DataStoreModule],
  controllers: [PractitionerController],
  providers: [PractitionerService],
})
export class PractitionerModule {}
