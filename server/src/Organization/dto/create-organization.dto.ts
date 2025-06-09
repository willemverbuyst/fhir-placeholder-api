import { ApiProperty } from "@nestjs/swagger";
import { Escape, Trim } from "class-sanitizer";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

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

  @ApiProperty({
    type: Boolean,
    description: "The active status of the organization",
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  active: boolean;
}
