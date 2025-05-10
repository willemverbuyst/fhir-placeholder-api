import { Controller, Get, Param } from "@nestjs/common";
// biome-ignore lint/style/useImportType: nestjs quirk
import { AppointmentService } from "./appointment.service";

@Controller("Appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  findAll() {
    return this.appointmentService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.appointmentService.findOne(+id);
  }
}
