import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Bundle, EpisodeOfCare, Patient } from 'fhir/r5';
import { episodeOFCareBundleExample } from '../EpisodeOfCare/examples/episode-of-care-bundle.example';
import { examplePatientBundle } from './examples/patient-bundle.example';
import { examplePatient } from './examples/patient.example';
import { PatientService } from './patient.service';

@Controller('Patient')
export class PatientController {
  constructor(private readonly patientsService: PatientService) {}

  @ApiOkResponse({
    description: 'All patients',
    example: examplePatientBundle,
  })
  @Get()
  async findAll(): Promise<Bundle<Patient>> {
    const patients = await this.patientsService.findAll();

    return patients;
  }

  @ApiOkResponse({
    description: 'The patient is returned successfully',
    example: examplePatient,
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
    const episodes = await this.patientsService.findAllEpisodesForPatient(id);

    return episodes;
  }
}
