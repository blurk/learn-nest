import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: any = {
    id: '1',
    email: 'test@example.com',
    name: 'Test User',
  };

  const mockUserService = {
    createUser: vi.fn(),
    getUserById: vi.fn(),
    getUsers: vi.fn(),
    updateUser: vi.fn(),
    deleteUser: vi.fn(),
    findByEmail: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne', async () => {
    const req = { user: mockUser };
    const result = await controller.getMe(req);

    expect(result).toEqual(mockUser);
  });
});
