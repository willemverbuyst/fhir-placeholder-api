import { IsOptional, IsString } from "class-validator";

export class GetEncounterDto {
  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @IsOptional()
  "episode-of-care": string;
}
