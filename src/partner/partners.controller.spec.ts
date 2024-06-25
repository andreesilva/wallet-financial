import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';

describe('PartnersController', () => {
  let controller: PartnersController;

  const mockPartnersService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [{ provide: PartnersService, useValue: mockPartnersService }],
    }).compile();

    controller = module.get<PartnersController>(PartnersController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const partnerDto = {
      name: 'marcelo',
    };
    await controller.create(partnerDto, { user: { id: 1 } });

    expect(mockPartnersService.create).toHaveBeenCalledTimes(1);
    expect(mockPartnersService.create).toHaveBeenCalledWith(partnerDto);
  });
});
