import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { MemoryCatsRepository } from './repositories/memory-cats.repository';

describe('CatsController', () => {
  let controller: CatsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: new CatsService(new MemoryCatsRepository()),
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
