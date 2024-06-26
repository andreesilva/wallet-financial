import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

describe('TransactionsController', () => {
  let controller: TransactionsController;

  const mockTransactionsService = {
    transfer: jest.fn(),
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],

      providers: [
        { provide: TransactionsService, useValue: mockTransactionsService },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('transfer', async () => {
    const transactiontDto: UpdateTransactionDto = {
      balance: 100,
    };

    await controller.transfer('1', transactiontDto, { userId: { id: 1 } });

    expect(mockTransactionsService.transfer).toHaveBeenCalledTimes(1);
    expect(mockTransactionsService.transfer).toHaveBeenCalledWith(
      +'1',
      transactiontDto,
      undefined,
    );
  });

  it('findOne', async () => {
    await controller.findOne(1);

    expect(mockTransactionsService.findOne).toHaveBeenCalledTimes(1);
    expect(mockTransactionsService.findOne).toHaveBeenCalledWith(1);
  });
});
