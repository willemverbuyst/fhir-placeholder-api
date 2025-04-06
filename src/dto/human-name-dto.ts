import { ApiProperty } from '@nestjs/swagger';

export class HumanNameDto {
  @ApiProperty({
    type: String,
    description: "Family name (often called 'Surname')",
    example: 'Doe',
  })
  family: string;

  @ApiProperty({
    type: String,
    description: "Given names (not always 'first'). Includes middle names",
    example: 'John',
    isArray: true,
  })
  given: string[];
}
