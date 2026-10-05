import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from './repositories/users.repository';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  beforeEach(async () => {
    const mockRepository = {
      create: vi.fn(),
      findById: vi.fn(),
      findAll: vi.fn(),
      findByEmail: vi.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should throw a NotFoundException if user is not found', async () => {
    vi.spyOn(repository, 'findById').mockResolvedValue(null);

    await expect(service.getUserById('123')).rejects.toThrow(NotFoundException);
  });

  it('should return a user if found', async () => {
    const mockUser = {
      id: '123',
      username: 'testuser',
      email: 'test@test.com',
    };

    vi.spyOn(repository, 'findById').mockResolvedValue(mockUser as any);

    const result = await service.getUserById('123');

    expect(result).toEqual(mockUser);
  });
});
