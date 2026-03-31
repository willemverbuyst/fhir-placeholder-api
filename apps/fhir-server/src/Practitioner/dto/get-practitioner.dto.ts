import { IsOptional, IsString } from "class-validator";

export class GetPractitionerDto {
  @IsString()
  @IsOptional()
  _include?: string;

  @IsString()
  @IsOptional()
  "_include:iterate"?: string;
}
