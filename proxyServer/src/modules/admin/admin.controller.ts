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
    return JSON.stringify(require('../../assets/serverConfig/main-config.js'));
  }

  @Post('admin/user/update')
  async updateUserProfile() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: '/api/users/update',
      modifyResponse: prepareUserProfileToFront,
      modifyRequest: ({ requestParams: { data } }) => {
        const resultData = { ...data, active: !data.blocked };
        return { data: omit(['blocked'], resultData) };
      },
    });
  }
}
