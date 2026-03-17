import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ResourceCountsService } from "./resource-counts.service";

@Controller("$resource-counts")
export class ResourceCountsController {
  constructor(private readonly resourceCountsService: ResourceCountsService) {}

  @ApiOkResponse({
    description: "Counts of each resource type",
  })
  @Get()
  async getResourceCounts(): Promise<Record<string, number>> {
    return await this.resourceCountsService.getResourceCounts();
  }
}
