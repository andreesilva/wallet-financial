import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class AccountsService {
  constructor(
    private prismaService: PrismaService,
    private tenantService: TenantService,
  ) {}
  create(createAccountDto: CreateAccountDto) {
    return this.prismaService.account.create({
      data: {
        balance: createAccountDto.balance,
        partnerId: this.tenantService.getTenant().id,
      },
    });
  }

  /*
  findAll() {
    return `This action returns all accounts`;
  }
  /*

  /*
  findOne(id: number) {
    return `This action returns a #${id} account`;
  }
  */
}
