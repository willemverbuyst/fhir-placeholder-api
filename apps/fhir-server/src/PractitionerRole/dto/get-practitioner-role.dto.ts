import { IsOptional, IsString } from "class-validator";

export class GetPractitionerRoleDto {
  @IsString()
  @IsOptional()
  _include: string;

  @IsString()
  @IsOptional()
  organization: string;

  @IsString()
  @IsOptional()
  practitioner: string;
}
