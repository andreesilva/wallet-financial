import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;

  const mockUsersService = {
    createCommonUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('createCommonUser', async () => {
    const userDto = {
      name: 'marcelo',
      email: 'marcelo@gmail.com',
      password: '123456',
    };
    await controller.create(userDto);

    expect(mockUsersService.createCommonUser).toHaveBeenCalledTimes(1);
    expect(mockUsersService.createCommonUser).toHaveBeenCalledWith(userDto);
  });
});
