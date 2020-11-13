import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  removeConfigCache(subStringPath: string) {
    Object.keys(require.cache).forEach(key => {
      if (!key.includes(subStringPath)) return;
      delete require.cache[key];
    });
  }
}
