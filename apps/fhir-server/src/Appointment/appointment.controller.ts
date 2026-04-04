import { Controller, Get, Query, ValidationPipe } from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Appointment, Bundle } from "fhir/r5";
import { AppointmentService } from "./appointment.service";
import { GetAppointmentDto } from "./dto/get-appointment.dto";
import { appointmentBundleExample } from "./examples/appointment-bundle.example";

@Controller("Appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOkResponse({
    description: "All appointments",
    example: appointmentBundleExample,
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Patient ID to filter appointments by patient",
    type: String,
  })
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
  ): Promise<Bundle<Appointment>> {
    return await this.appointmentService.findAll(query);
  }
}
