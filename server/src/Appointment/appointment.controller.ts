import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import type { Appointment, Bundle } from "fhir/r5";
import type { Id } from "src/types";
// biome-ignore lint/style/useImportType: nestjs quirk
import { AppointmentService } from "./appointment.service";
// biome-ignore lint/style/useImportType: nestjs quirk
import { GetAppointmentDto } from "./dto/get-appointment.dto";

@Controller("Appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query?: GetAppointmentDto,
  ): Promise<Bundle<Appointment & Id>> {
    return await this.appointmentService.findAll(query);
  }
}
