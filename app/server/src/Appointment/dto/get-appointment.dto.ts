import { IsOptional, IsString } from "class-validator";

export class GetAppointmentDto {
  @IsString()
  @IsOptional()
  patient: string;
}
