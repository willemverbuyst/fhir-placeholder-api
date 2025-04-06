import { ApiProperty } from '@nestjs/swagger';

export class ReferenceDto {
  @ApiProperty({
    type: String,
    description: 'Literal reference, Relative, internal or absolute URL',
    example: 'ResourceType/12345-67890',
  })
  reference: string;
}
