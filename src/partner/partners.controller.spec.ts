import { Test, TestingModule } from '@nestjs/testing';
import { PartnersController } from './partners.controller';
import { PartnersService } from './partners.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreatePartnerDto } from './dto/create-partner.dto';

describe('PartnersController', () => {
  let controller: PartnersController;

  const mockPartnersService = {
    create: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PartnersController],
      providers: [{ provide: PartnersService, useValue: mockPartnersService }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<PartnersController>(PartnersController);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('create', async () => {
    const partnerDto: CreatePartnerDto = {
      name: 'marcelo',
    };
    // const userId = 1;

    await controller.create(partnerDto, { userId: { id: 1 } });

    expect(mockPartnersService.create).toHaveBeenCalledTimes(1);
    expect(mockPartnersService.create).toHaveBeenCalledWith(partnerDto);
  });
});
