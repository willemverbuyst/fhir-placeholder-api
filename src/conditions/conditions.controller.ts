import { Controller, Get, Param } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get()
  findAll() {
    return this.conditionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conditionsService.findOne(id);
  }
}
