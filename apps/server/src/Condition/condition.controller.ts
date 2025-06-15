import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Query,
  ValidationPipe,
} from "@nestjs/common";
import { ApiNotFoundResponse, ApiOkResponse, ApiQuery } from "@nestjs/swagger";
import type { Bundle, Condition } from "fhir/r5";
import type { Id } from "src/types";
import { ConditionService } from "./condition.service";
import { GetConditionDto } from "./dto/get-condition.dto";
import { conditionBundleExample } from "./examples/condition-bundle.example";
import { conditionExample } from "./examples/condition.example";

@Controller("Condition")
export class ConditionController {
  constructor(private readonly conditionService: ConditionService) {}

  @ApiOkResponse({
    description: "All conditions",
    example: conditionBundleExample,
  })
  @ApiQuery({
    name: "patient",
    required: false,
    description: "Patient ID to filter episodes by patient",
    type: String,
  })
  @Get()
  async findAll(
    @Query(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query?: GetConditionDto,
  ): Promise<Bundle<Condition & Id>> {
    return await this.conditionService.findAll(query);
  }

  @ApiOkResponse({
    description: "The condition is returned successfully",
    example: conditionExample,
  })
  @ApiNotFoundResponse({
    description: "Condition not found",
  })
  @Get(":id")
  async findOne(@Param("id") id: string): Promise<Condition & Id> {
    const condition = await this.conditionService.findOne(id);
    if (!condition) {
      throw new NotFoundException("condition not found");
    }
    return condition;
  }
}
