import { Module } from "@nestjs/common";
import { DataStoreModule } from "../db/dataStore.module";
import { AppointmentController } from "./appointment.controller";
import { AppointmentService } from "./appointment.service";

@Module({
  imports: [DataStoreModule],
  controllers: [AppointmentController],
  providers: [AppointmentService],
})
export class AppointmentModule {}
