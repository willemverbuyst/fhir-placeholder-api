import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { EpisodeOfCareDto } from '../EpisodeOfCare/dto/episode-of-care.dto';
import { PatientDto } from './dto/patient.dto';
import { PatientService } from './patient.service';

@Controller('Patient')
export class PatientController {
  constructor(private readonly patientsService: PatientService) {}

  @ApiOkResponse({
    description: 'All patients',
    type: PatientDto,
    isArray: true,
  })
  @Get()
  async findAll() {
    const patients = await this.patientsService.findAll();

    return patients;
  }

  @ApiOkResponse({
    description: 'The patient is returned successfully',
    type: PatientDto,
  })
  @ApiNotFoundResponse({
    description: 'Patient not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientsService.findOne(id);

    if (!patient) {
      throw new NotFoundException('patient not found');
    }

    return patient;
  }

  @ApiOkResponse({
    description: 'All episodes for patient',
    type: EpisodeOfCareDto,
    isArray: true,
  })
  @Get(':id/episodes')
  async findAllEpisodesForPatient(@Param('id') id: string) {
    const episodes = await this.patientsService.findAllEpisodesForPatient(id);

    return episodes;
  }
}
