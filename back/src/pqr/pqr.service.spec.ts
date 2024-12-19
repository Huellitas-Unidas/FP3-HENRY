import { Test, TestingModule } from '@nestjs/testing';
import { PqrService } from './pqr.service';

describe('PqrService', () => {
  let service: PqrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PqrService],
    }).compile();

    service = module.get<PqrService>(PqrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
