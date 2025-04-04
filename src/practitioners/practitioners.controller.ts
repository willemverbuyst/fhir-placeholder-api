import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { PractitionersService } from './practitioners.service';

@Controller('practitioners')
export class PractitionersController {
  constructor(private readonly practitionersService: PractitionersService) {}

  @Get()
  findAll() {
    return this.practitionersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const practitioner = await this.practitionersService.findOne(id);
    if (!practitioner) {
      throw new NotFoundException('practitioner not found');
    }
    return practitioner;
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const practitioner = await this.practitionersService.remove(id);
    if (!practitioner) {
      throw new NotFoundException('practitioner not found');
    }
    return practitioner;
  }
}
