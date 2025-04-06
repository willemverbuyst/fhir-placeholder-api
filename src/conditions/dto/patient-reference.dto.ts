import { ApiProperty } from '@nestjs/swagger';

export class PatientReferenceDto {
  @ApiProperty({
    type: String,
    description: 'Reference to the patient',
    example: 'Patient/12345-67890',
  })
  reference: string;
}
