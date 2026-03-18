import { IsOptional, IsString } from "class-validator";

export class GetCommunicationDto {
  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @IsOptional()
  encounter: string;
}
