import { Test, TestingModule } from '@nestjs/testing';
import { ResourceTreeController } from './resource-tree.controller';
import { ResourceTreeService } from './resource-tree.service';

describe('ResourceTreeController', () => {
  let controller: ResourceTreeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResourceTreeController],
      providers: [ResourceTreeService],
    }).compile();

    controller = module.get<ResourceTreeController>(ResourceTreeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
