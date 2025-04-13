import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Bundle, EpisodeOfCare, Patient } from 'fhir/r5';
import { episodeOFCareBundleExample } from '../EpisodeOfCare/examples/episode-of-care-bundle.example';
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
  @Get()
  async findAll(): Promise<Bundle<Patient>> {
    return await this.patientsService.findAll();
  }

  @ApiOkResponse({
    description: 'The patient is returned successfully',
    example: patientExample,
  })
  @ApiNotFoundResponse({
    description: 'Patient not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Patient | undefined> {
    const patient = await this.patientsService.findOne(id);
    if (!patient) {
      throw new NotFoundException('patient not found');
    }
    return patient;
  }

  @ApiOkResponse({
    description: 'All episodes for patient',
    example: episodeOFCareBundleExample,
  })
  @Get(':id/episodes')
  async findAllEpisodesForPatient(
    @Param('id') id: string,
  ): Promise<Bundle<EpisodeOfCare>> {
    return await this.patientsService.findAllEpisodesForPatient(id);
  }
}
