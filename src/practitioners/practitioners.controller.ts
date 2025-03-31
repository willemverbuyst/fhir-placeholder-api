import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePractitionerDto } from './dto/create-practitioner.dto';
import { UpdatePractitionerDto } from './dto/update-practitioner.dto';
import { PractitionersService } from './practitioners.service';

@Controller('practitioners')
export class PractitionersController {
  constructor(private readonly practitionersService: PractitionersService) {}

  @Post()
  create(@Body() createPractitionerDto: CreatePractitionerDto) {
    return this.practitionersService.create(createPractitionerDto);
  }

  @Get()
  findAll() {
    return this.practitionersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.practitionersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePractitionerDto: UpdatePractitionerDto,
  ) {
    return this.practitionersService.update(+id, updatePractitionerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.practitionersService.remove(+id);
  }
}
