import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createCommonUser: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createCommonUser', async () => {
    const userDto: CreateUserDto = {
      name: 'marcelo',
      email: 'marcelo@gmail.com',
      password: '123456',
    };
    await controller.create(userDto);

    expect(mockUsersService.createCommonUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.createCommonUser).toHaveBeenCalledWith(userDto);
  });
});
