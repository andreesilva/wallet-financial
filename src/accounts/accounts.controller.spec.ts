import { Test, TestingModule } from '@nestjs/testing';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './accounts.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountDto } from './dto/create-account.dto';

describe('AccountsController', () => {
  let controller: AccountsController;

  const mockAccountsService = {
    create: jest.fn(),
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
  it('create', async () => {
    const accountDto: CreateAccountDto = {
      balance: 100,
    };
    await controller.create(accountDto);

    expect(mockAccountsService.create).toHaveBeenCalledTimes(1);
    expect(mockAccountsService.create).toHaveBeenCalledWith(accountDto);
  });
});
