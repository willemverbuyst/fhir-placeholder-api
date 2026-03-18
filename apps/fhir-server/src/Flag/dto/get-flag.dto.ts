import { IsOptional, IsString } from "class-validator";

export class GetFlagDto {
  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @IsOptional()
  encounter: string;
}
