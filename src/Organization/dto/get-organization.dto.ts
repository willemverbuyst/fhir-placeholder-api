import { IsOptional, IsString } from 'class-validator';

export class GetOrganizationDto {
  @IsString()
  @IsOptional()
  name: string;
}
