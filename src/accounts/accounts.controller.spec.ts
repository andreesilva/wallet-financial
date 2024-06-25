import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AuthGuard } from 'src/auth/auth.guard';

describe('AccountsController', () => {
  let controller: AccountsController;

  const mockAccountsService = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AccountsController],

      providers: [{ provide: AccountsService, useValue: mockAccountsService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<AccountsController>(AccountsController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('findOne', async () => {
    const partnerDto = {
      name: 'marcelo',
    };
    await controller.findOne('1');

    expect(mockAccountsService.findOne).toHaveBeenCalledTimes(1);
    expect(mockAccountsService.findOne).toHaveBeenCalledWith(partnerDto);
  });
});
