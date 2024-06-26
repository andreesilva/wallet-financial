import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerDto } from './dto/create-partner.dto';

import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}
  @ApiTags('Partners')
  @Post()
  create(@Body() createPartnerDto: CreatePartnerDto, @Req() req: any) {
    return this.partnersService.create({
      ...createPartnerDto,
      userId: req.user.id,
    });
  }
}
