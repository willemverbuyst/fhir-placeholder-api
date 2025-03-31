import { Test, TestingModule } from '@nestjs/testing';
import { PractitionersController } from './practitioners.controller';
import { PractitionersService } from './practitioners.service';

describe('PractitionersController', () => {
  let controller: PractitionersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PractitionersController],
      providers: [PractitionersService],
    }).compile();

    controller = module.get<PractitionersController>(PractitionersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
