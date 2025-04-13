import { Injectable } from '@nestjs/common';

@Injectable()
export class ObservationService {
  findAll() {
    return `This action returns all observation`;
  }
}
