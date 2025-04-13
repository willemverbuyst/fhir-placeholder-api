import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from '@nestjs/swagger';
import { Bundle, Patient } from 'fhir/r5';
import { Id } from '../types';
import { GetPatientDto } from './dto/get-patient.dto';
import { patientBundleExample } from './examples/patient-bundle.example';
import { patientExample } from './examples/patient.example';
import { PatientService } from './patient.service';

@Controller('Patient')
export class PatientController {
  constructor(private readonly patientsService: PatientService) {}

  @ApiOkResponse({
    description: 'All patients',
    example: patientBundleExample,
  })
  @ApiQuery({
    name: 'organization',
    required: false,
    description: 'Filter patients by managing organization',
    type: String,
  })
  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query?: GetPatientDto,
  ): Promise<Bundle<Patient & Id>> {
    return await this.patientsService.findAll(query);
  }

  @ApiOkResponse({
    description: 'The patient is returned successfully',
    example: patientExample,
  })
  @ApiNotFoundResponse({
    description: 'Patient not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient & Id> {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    return patient;
  }
}
