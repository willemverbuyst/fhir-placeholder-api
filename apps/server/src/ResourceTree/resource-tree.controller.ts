import { Controller, Get } from "@nestjs/common";
import { ResourceTreeService } from "./resource-tree.service";

@Controller("$resource-tree")
export class ResourceTreeController {
  constructor(private readonly resourceTreeService: ResourceTreeService) {}

  @Get()
  async getResourceTree(): Promise<Record<string, unknown>> {
    return await this.resourceTreeService.generateTree();
  }
}
