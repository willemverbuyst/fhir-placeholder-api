import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { PractitionerRoleController } from "./practitioner-role.controller";
import { PractitionerRoleService } from "./practitioner-role.service";

@Module({
  imports: [DataStoreModule],
  controllers: [PractitionerRoleController],
  providers: [PractitionerRoleService],
})
export class PractitionerRoleModule {}
