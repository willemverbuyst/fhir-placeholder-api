import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { PatientsService } from './patients.service';

@Controller('patients')
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @Get()
  async findAll() {
    const patients = await this.patientsService.findAll();

    return patients;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const patient = await this.patientsService.findOne(id);

    if (!patient) {
      throw new NotFoundException('patient not found');
    }

    return patient;
  }

  @Get(':id/episodes')
  async findAllEpisodesForPatient(@Param('id') id: string) {
    const episodes = await this.patientsService.findAllEpisodesForPatient(id);

    return episodes;
  }
}
