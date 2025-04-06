import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ConditionsService } from './conditions.service';
import { ConditionDto } from './dto/condition.dto';

@Controller('conditions')
export class ConditionsController {
  constructor(private readonly conditionsService: ConditionsService) {}

  @ApiOkResponse({
    description: 'All conditions',
    type: ConditionDto,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.conditionsService.findAll();
  }

  @ApiOkResponse({
    description: 'The condition is returned successfully',
    type: ConditionDto,
  })
  @ApiNotFoundResponse({
    description: 'Condition not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const condition = await this.conditionsService.findOne(id);

    if (!condition) {
      throw new NotFoundException('Condition not found');
    }
    return condition;
  }
}
