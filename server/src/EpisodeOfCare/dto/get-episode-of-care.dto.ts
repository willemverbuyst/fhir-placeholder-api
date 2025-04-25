import { IsOptional, IsString } from "class-validator";

export class GetEpisodeDto {
  @IsString()
  @IsOptional()
  patient: string;

  @IsString()
  @IsOptional()
  "diagnosis-reference": string;
}
