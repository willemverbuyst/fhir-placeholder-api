import {
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PractitionerDto } from './dto/practitioner.dto';
import { PractitionersService } from './practitioners.service';

@Controller('practitioners')
export class PractitionersController {
  constructor(private readonly practitionersService: PractitionersService) {}

  @ApiOkResponse({
    description: 'All practitioners',
    type: PractitionerDto,
    isArray: true,
  })
  @Get()
  findAll() {
    return this.practitionersService.findAll();
  }

  @ApiOkResponse({
    description: 'The practitioner is returned successfully',
    type: PractitionerDto,
  })
  @ApiNotFoundResponse({
    description: 'Practitioner not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const practitioner = await this.practitionersService.findOne(id);
    if (!practitioner) {
      throw new NotFoundException('practitioner not found');
    }
    return practitioner;
  }

  @ApiOkResponse({
    description: 'The practitioner is deleted successfully',
    type: PractitionerDto,
  })
  @ApiNotFoundResponse({
    description: 'Practitioner not found',
  })
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const practitioner = await this.practitionersService.remove(id);
    if (!practitioner) {
      throw new NotFoundException('practitioner not found');
    }
    return practitioner;
  }
}
