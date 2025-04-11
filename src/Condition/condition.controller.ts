import { Controller, Get, NotFoundException, Param } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Bundle, Condition } from 'fhir/r5';
import { ConditionService } from './condition.service';
import { conditionBundleExample } from './examples/condition-bundle.example';
import { conditionExample } from './examples/condition.example';

@Controller('Condition')
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @ApiOkResponse({
    description: 'All conditions',
    example: conditionBundleExample,
  })
  @Get()
  async findAll(): Promise<Bundle<Condition>> {
    return await this.conditionService.findAll();
  }

  @ApiOkResponse({
    description: 'The condition is returned successfully',
    example: conditionExample,
  })
  @ApiNotFoundResponse({
    description: 'Condition not found',
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Condition> {
    const condition = await this.conditionService.findOne(id);
    if (!condition) {
      throw new NotFoundException('condition not found');
    }
    return condition;
  }
}
