import { ApiProperty } from "@nestjs/swagger";
import { Escape, Trim } from "class-sanitizer";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateOrganizationDto {
  @ApiProperty({
    type: String,
    description: "The name of the organization",
    example: "Acme Corporation",
  })
  @IsString()
  @IsNotEmpty()
  @Trim()
  @Escape()
  name: string;
}
