import { Injectable } from '@nestjs/common';
import { DataStore } from 'src/db/dataStore.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientsService {
  constructor(private readonly repo: DataStore) {}

  create(createPatientDto: CreatePatientDto) {
    return 'This action adds a new patient';
  }

  findAll() {
    return this.repo.patients;
  }

  findOne(id: number) {
    return this.repo.patients.find((patient) => patient.id === String(id));
  }

  findAllEpisodesForPatient(id: number) {
    return this.repo.episodes.filter(
      (episode) => episode.patient.reference?.split('/')[1] === String(id),
    );
  }

  update(id: number, updatePatientDto: UpdatePatientDto) {
    return `This action updates a #${id} patient`;
  }

  remove(id: number) {
    return `This action removes a #${id} patient`;
  }
}
