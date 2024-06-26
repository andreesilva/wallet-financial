import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { ApiTags } from '@nestjs/swagger';

@UseGuards(AuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @ApiTags('Transactions')
  @Get(':partnerId')
  findOne(@Param('partnerId') partnerId: number) {
    return this.transactionsService.findOne(partnerId);
  }
  @ApiTags('Transactions')
  @Patch('transfer/:id')
  transfer(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @Req() req: any,
  ) {
    const userId = req.user;
    return this.transactionsService.transfer(+id, updateTransactionDto, userId);
  }
}
