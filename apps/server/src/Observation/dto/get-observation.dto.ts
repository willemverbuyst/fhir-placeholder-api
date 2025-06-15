import { IsOptional, IsString } from "class-validator";

export class GetObservationDto {
  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @IsOptional()
  encounter: string;
}
