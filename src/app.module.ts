import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { PartnersModule } from './partner/partners.module';
import { AccountsModule } from './accounts/accounts.module';
import { TenantModule } from './tenant/tenant.module';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    PartnersModule,
    AccountsModule,
    TenantModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
