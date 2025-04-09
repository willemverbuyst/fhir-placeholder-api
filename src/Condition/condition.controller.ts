import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { ConditionService } from './condition.service';
import { ConditionDto } from './dto/condition.dto';

@Controller('Condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @ApiOkResponse({
    description: 'All conditions',
    type: ConditionDto,
    isArray: true,
  })
  @Get()
  async findAll() {
    return await this.conditionService.findAll();
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
    const condition = await this.conditionService.findOne(id);

    if (!condition) {
      throw new NotFoundException('condition not found');
    }
    return condition;
  }
}
