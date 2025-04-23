import { IsOptional, IsString } from 'class-validator';

export class GetPatientDto {
  @IsString()
  @IsOptional()
  organization: string;

  @IsString()
  @IsOptional()
  'general-practitioner': string;
}
