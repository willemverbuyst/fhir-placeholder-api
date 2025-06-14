import { IsOptional, IsString } from "class-validator";

export class GetPractitionerRoleDto {
  @IsString()
  @IsOptional()
  organization: string;

  @IsString()
  @IsOptional()
  practitioner: string;
}
