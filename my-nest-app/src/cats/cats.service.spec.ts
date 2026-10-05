import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { MemoryCatsRepository } from './repositories/memory-cats.repository';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CatsService,
        {
          provide: MemoryCatsRepository,
          useValue: new MemoryCatsRepository(),
        },
      ],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
