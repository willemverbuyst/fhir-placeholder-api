import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus } from "@repo/dummy-data";
import { Escape, Trim } from "class-sanitizer";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateAppointmentDto {
  @ApiProperty({
    type: String,
    description: "The status of the appointment",
    example: AppointmentStatus.BOOKED,
  })
  @IsEnum(AppointmentStatus)
  status: AppointmentStatus;

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
