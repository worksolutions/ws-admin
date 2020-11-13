import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { CacheService } from 'services/cache.service';
import { ProxyService } from 'services/proxy.service';
import { ErrorService } from 'services/error.service';

@Global()
@Module({
  imports: [ConfigModule.forRoot()],
  providers: [CacheService, ProxyService, ErrorService],
  exports: [CacheService, ProxyService, ErrorService],
})
export class CoreModule {}
