import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @ApiTags('Users')
  @Post('login')
  login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }
}
