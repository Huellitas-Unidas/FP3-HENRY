import { Test, TestingModule } from '@nestjs/testing';
import { PqrController } from './pqr.controller';
import { PqrService } from './pqr.service';

describe('PqrController', () => {
  let controller: PqrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PqrController],
      providers: [PqrService],
    }).compile();

    controller = module.get<PqrController>(PqrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
