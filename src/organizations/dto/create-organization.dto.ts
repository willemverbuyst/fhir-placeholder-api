import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateOrganizationDto {
  @ApiProperty({
    type: String,
    description: 'The name of the organization',
    example: 'Acme Corporation',
  })
  @IsNotEmpty()
  name: string;
}
