import { Module } from "@nestjs/common";
import { PractitionerController } from "./practitioner.controller";
import { PractitionerService } from "./practitioner.service";
import { Practitioner } from "./practitioner.entity";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([Practitioner])],
  controllers: [PractitionerController],
  providers: [PractitionerService],
})
export class PractitionerModule {}
