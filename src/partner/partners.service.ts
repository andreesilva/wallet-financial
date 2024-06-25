import { Injectable } from '@nestjs/common';
import { CreatePartnerDto } from './dto/create-partner.dto';

import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PartnersService {
  constructor(private prismaService: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { userId: number }) {
    const partner = await this.prismaService.$transaction(async (prisma) => {
      const partner = await this.prismaService.partner.create({
        data: {
          name: createPartnerDto.name,
        },
      });
      await prisma.partnerUser.create({
        data: {
          userId: createPartnerDto.userId,
          partnerId: partner.id,
        },
      });
      return partner;
    });
    return partner;
  }
}
