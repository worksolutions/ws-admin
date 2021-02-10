import { join } from "path";
import { Controller, Get } from "@nestjs/common";
import { CacheService } from "services/cache.service";

@Controller("api")
export class AdminController {
  constructor(private cacheService: CacheService) {}

  @Get("admin/config")
  async getConfig(): Promise<string> {
    if (process.env.NODE_ENV === "development") {
      this.cacheService.removeConfigCache("serverConfig/main-config.js");
      this.cacheService.removeConfigCache("serverConfig/pages");
      return JSON.stringify(require(join(process.cwd(), "src/assets/serverConfig/main-config.js")));
    }

    return JSON.stringify(await import("assets/serverConfig/main-config.js"));
  }
}
