import { Controller, Delete, Get, Param } from '@nestjs/common';
import { PractitionersService } from './practitioners.service';

@Controller('practitioners')
export class PractitionersController {
  constructor(private readonly practitionersService: PractitionersService) {}

  @Get()
  findAll() {
    return this.practitionersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practitionersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practitionersService.remove(id);
  }
}
