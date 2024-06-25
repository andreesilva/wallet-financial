import { Injectable } from '@nestjs/common';

import { UserRoles } from './user-roles';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  createPartnerUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: UserRoles.PARTNER,
      },
    });
  }

  createCommonUser(data: CreateUserDto) {
    return this.prismaService.user.create({
      data: {
        ...data,
        password: this.generateHash(data.password),
        roles: UserRoles.USER,
      },
    });
  }

  generateHash(password: string) {
    return bcrypt.hashSync(password, 10);
  }

  findOne(idOrEmail: number | string) {
    return this.prismaService.user.findFirst({
      where: {
        ...(typeof idOrEmail === 'number'
          ? { id: idOrEmail }
          : { email: idOrEmail }),
      },
    });
  }
}
