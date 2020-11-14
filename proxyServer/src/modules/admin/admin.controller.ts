import { join } from 'path';

import { omit } from 'ramda';

import { Controller, Get, Post } from '@nestjs/common';

import { CacheService } from 'services/cache.service';

import { ProxyService } from 'services/proxy.service';

import prepareUserProfileToFront from 'modules/users/formatters/prepareUserProfileToFront';

@Controller('api')
export class AdminController {
  constructor(
    private cacheService: CacheService,
    private proxyService: ProxyService,
  ) {}

  @Get('admin/config')
  async getConfig(): Promise<string> {
    this.cacheService.removeConfigCache('serverConfig/main-config.js');
    this.cacheService.removeConfigCache('serverConfig/pages');
    return JSON.stringify(
      require(join(process.cwd(), 'src/assets/serverConfig/main-config.js')),
    );
  }
}
