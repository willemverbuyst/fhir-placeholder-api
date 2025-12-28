import { Test, TestingModule } from "@nestjs/testing";
import { ResourceTreeService } from "./resource-tree.service";

describe("ResourceTreeService", () => {
  let service: ResourceTreeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResourceTreeService],
    }).compile();

    service = module.get<ResourceTreeService>(ResourceTreeService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
