import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { CreateOrganizationDto } from './create-organization.dto';

export class UpdateOrganizationDto extends PartialType(CreateOrganizationDto) {
  @ApiProperty({
    type: String,
    description: 'The name of the organization',
    example: 'Acme Corporation',
  })
  @IsNotEmpty()
  name: string;
}
