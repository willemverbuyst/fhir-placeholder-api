import { ApiProperty } from "@nestjs/swagger";
import { appointmentStatus } from "@repo/fhir-codes";
import { Escape, Trim } from "class-sanitizer";
import { IsIn, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    type: String,
    description: "The status of the appointment",
    example: "booked",
    enum: appointmentStatus,
  })
  @IsIn(appointmentStatus)
  status: (typeof appointmentStatus)[number];

  @ApiProperty({
    type: String,
    description: "The patient (id) for which the appointment is",
    example: "patient-id",
  })
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Escape()
  subject: string;
}
