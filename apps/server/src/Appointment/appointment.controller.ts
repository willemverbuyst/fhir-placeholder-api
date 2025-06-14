import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Appointment, Bundle } from "fhir/r5";
import * as sanitizeHtml from "sanitize-html";
import type { Id } from "src/types";
// biome-ignore lint/style/useImportType: nestjs quirk
import { AppointmentService } from "./appointment.service";
// biome-ignore lint/style/useImportType: nestjs quirk
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
// biome-ignore lint/style/useImportType: nestjs quirk
import { GetAppointmentDto } from "./dto/get-appointment.dto";
import { appointmentBundleExample } from "./examples/appointment-bundle.example";

@Controller("Appointment")
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @ApiOkResponse({
    description: "The organization is created successfully",
    // example: organizationExample,
  })
  @Post()
  async create(
    @Body(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    createAppointmentDto: CreateAppointmentDto,
  ): Promise<Appointment & Id> {
    const subject = sanitizeHtml(createAppointmentDto.subject, {
      allowedTags: [],
      allowedAttributes: {},
    });
    return this.appointmentService.create({
      status: createAppointmentDto.status,
      subject,
    });
  }

  @ApiOkResponse({
    description: "All conditions",
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
  ): Promise<Bundle<Appointment & Id>> {
    return await this.appointmentService.findAll(query);
  }
}
