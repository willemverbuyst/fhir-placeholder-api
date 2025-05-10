import { Controller, Get } from "@nestjs/common";
import type { Appointment, Bundle } from "fhir/r5";
// biome-ignore lint/style/useImportType: nestjs quirk
import { AppointmentService } from "./appointment.service";

@Controller("Appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll(): Promise<Bundle<Appointment>> {
    return await this.appointmentService.findAll();
  }
}
