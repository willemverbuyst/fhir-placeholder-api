import { Injectable } from "@nestjs/common";

@Injectable()
export class AppointmentService {
  findAll() {
    return "This action returns all appointments";
  }

  findOne(id: number) {
    return `This action returns a #${id} appointment`;
  }
}
