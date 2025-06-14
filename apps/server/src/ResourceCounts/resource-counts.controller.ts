import { Controller, Get } from "@nestjs/common";
import { ResourceCountsService } from "./resource-counts.service";

@Controller("$resource-counts")
export class ResourceCountsController {
  constructor(private readonly resourceCountsService: ResourceCountsService) {}

  @Get()
  async getResourceCounts(): Promise<Record<string, number>> {
    return await this.resourceCountsService.getResourceCounts();
  }
}
