import { Global, Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantInterceptor } from './tenant.interceptor.spec';

@Global()
@Module({
  providers: [TenantService, TenantInterceptor],
  exports: [TenantService],
})
export class TenantModule {}
