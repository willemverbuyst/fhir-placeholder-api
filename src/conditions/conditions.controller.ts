import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ConditionsService } from './conditions.service';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @Get()
  async findAll() {
    return await this.conditionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const condition = await this.conditionsService.findOne(id);

    if (!condition) {
      throw new NotFoundException('Condition not found');
    }
    return condition;
  }
}
