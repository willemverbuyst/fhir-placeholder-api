import { Module } from "@nestjs/common";
import { PractitionerRoleController } from "./practitioner-role.controller";
import { PractitionerRoleService } from "./practitioner-role.service";
import { PractitionerRole } from "./practitioner-role.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([PractitionerRole])],
  controllers: [PractitionerRoleController],
  providers: [PractitionerRoleService],
})
export class PractitionerRoleModule {}
