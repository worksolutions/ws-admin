import { omit } from "ramda";

import { Controller, Get, Param, Post } from "@nestjs/common";

import { CacheService } from "services/cache.service";

import { ProxyService } from "services/proxy.service";

import prepareUsersDataToFront from "./formatters/prepareUsersDataToFront";

import prepareUserToFront from "./formatters/prepareUserToFront";

import prepareUserForListToFront from "./formatters/prepareUserForListToFront";

import prepareUserProfileToFront from "./formatters/prepareUserProfileToFront";

@Controller("api")
export class UsersController {
  constructor(private cacheService: CacheService, private proxyService: ProxyService) {}

  @Get("users")
  getUsers() {
    return this.proxyService.sendProxyRequest({
      realServerUrl: "/api/users",
      modifyResponse: prepareUsersDataToFront,
    });
  }

  @Get("users/profile")
  async getUsersProfile() {
    return await this.proxyService.sendProxyRequest({
      realServerUrl: "/api/users/profile",
      modifyResponse: prepareUserProfileToFront,
    });
  }

  @Get("users/:userId")
  getUserById(@Param("userId") userId: string) {
    return this.proxyService.sendProxyRequest({
      realServerUrl: `/api/users/${userId}`,
      modifyResponse: prepareUserToFront,
    });
  }

  @Get("users-list")
  getUsersList() {
    return this.proxyService.sendProxyRequest({
      realServerUrl: "/api/users",
      modifyResponse: ({ data }) => data.map(prepareUserForListToFront),
    });
  }

  @Post("users/store")
  createUser() {
    return this.proxyService.sendProxyRequest({
      realServerUrl: "/api/users/store",
      modifyResponse: ({ user }) => prepareUserForListToFront(user),
    });
  }

  @Post("users/update")
  updateUserProfile() {
    return this.proxyService.sendProxyRequest({
      realServerUrl: "/api/users/update",
      modifyResponse: prepareUserProfileToFront,
      modifyRequest: ({ requestParams: { data } }) => {
        const resultData = { ...data, active: !data.blocked };
        return { data: omit(["blocked"], resultData) };
      },
    });
  }
}
