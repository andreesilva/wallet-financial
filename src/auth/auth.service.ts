/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(data: LoginDto) {
    const user = await this.usersService.findOne(data.email);
    if (!user || !bcrypt.compareSync(data.password, user.password)) {
      throw new Error('Credenciais inválidas');
    }

    const { password, ...result } = user;
    return {
      access_token: this.jwtService.sign(result),
    };
  }
}
