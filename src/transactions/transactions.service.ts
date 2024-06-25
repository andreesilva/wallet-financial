import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateAccountDto } from 'src/accounts/dto/update-account.dto';
import { TenantService } from 'src/tenant/tenant.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prismaService: PrismaService,
    private tenantService: TenantService,
  ) {}

  findOne(partnerId: number) {
    return this.prismaService.account.findFirst({
      where: { partnerId: parseInt(partnerId.toString()) },
    });
  }

  async transfer(
    partnerId: number,
    updateAccountDto: UpdateAccountDto,
    userId: number,
  ) {
    const partnerReceiver = await this.prismaService.account.findFirst({
      where: { partnerId: parseInt(partnerId.toString()) },
    });

    const partnerUser = await this.prismaService.partnerUser.findFirst({
      where: { userId: userId },
    });

    const partnerTransferor = await this.prismaService.account.findFirst({
      where: { partnerId: partnerUser.partnerId },
    });

    console.log('Id usuário: ' + userId);
    console.log('Usuário do parceiro logado: ' + partnerUser.partnerId);
    console.log('Quem vai receber: ' + partnerReceiver.partnerId);

    console.log('Saldo de quem vai transferir: ' + partnerTransferor.balance);
    console.log('Saldo de quem vai receber: ' + updateAccountDto.balance);

    if (partnerUser.partnerId === partnerReceiver.partnerId) {
      throw new Error('Não é permitido transferência para a própria conta');
    }

    if (updateAccountDto.balance > partnerTransferor.balance) {
      throw new Error('Saldo insuficiente');
    }

    const newBalanceTransferor =
      partnerTransferor.balance - updateAccountDto.balance;

    const newBalanceReceiver =
      partnerReceiver.balance + updateAccountDto.balance;

    try {
      const balances = await this.prismaService.$transaction(async (prisma) => {
        await this.prismaService.account.update({
          where: {
            id: partnerTransferor.id,
          },
          data: {
            balance: newBalanceTransferor,
          },
        });

        return prisma.account.update({
          where: {
            id: partnerReceiver.id,
          },
          data: {
            balance: newBalanceReceiver,
          },
        });
        return balances;
      });
      return balances;
    } catch (error) {
      throw error;
    }
  }
}
