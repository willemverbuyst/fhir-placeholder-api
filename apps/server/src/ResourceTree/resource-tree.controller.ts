import { Controller, Get } from "@nestjs/common";
import { ApiOkResponse } from "@nestjs/swagger";
import { ResourceTreeService } from "./resource-tree.service";

@Controller("$resource-tree")
export class ResourceTreeController {
  constructor(private readonly resourceTreeService: ResourceTreeService) {}

  @ApiOkResponse({
    description: "Resource tree structure",
  })
  @Get()
  async getResourceTree(): Promise<Record<string, unknown>> {
    return await this.resourceTreeService.generateTree();
  }
}
