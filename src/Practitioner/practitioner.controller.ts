import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { PractitionerDto } from './dto/practitioner.dto';
import { PractitionerService } from './practitioner.service';

@Controller('Practitioner')
export class PractitionerController {
  constructor(private readonly practitionersService: PractitionerService) {}

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
}
